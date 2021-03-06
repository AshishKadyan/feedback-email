const event1 = require('./test/event');
const CommonUtil = require('./utilities/common.util');
const { Logger } = require('./utilities/logger.util');
const CustomEmailError = require('./utilities/custom-error.util');
const ApplicationErrors = require('./utilities/application-errors');
const getDataForIeltsEmailType = require("./services/email-data-services/ielts-feedback");
const EmailService = require("./services/email-service");
const config = require('./config/default.config');

const main = async (event, context) => {
  try {

    Logger.init(context);
    const logger = Logger.getLogger();
    logger.info(`Started processing '${event.Records.length}' records.`);

    let messageArray = event.Records.map((record) => {

      const bodyObj = JSON.parse(record.body);
      const msgObj = JSON.parse(bodyObj.Message);
      msgObj["messageId"] = record.messageId;
      Logger.initRecordLogger(context, record, bodyObj);
      return msgObj;

    });

    let sucessfullyProcessedMessageIds = [];
    // step1: seggregateRecordsByEmailType
    const { emailTypesMap, noCategoryMessageIds } = EmailService.seggregateRecordsByEmailType(messageArray);

    logger.info("Following messageIds do not belong to any category " + JSON.stringify(noCategoryMessageIds));
    // records belonging to no category are to be deleted from SQS along with successfully sent mails in last step.
    sucessfullyProcessedMessageIds = sucessfullyProcessedMessageIds.concat(noCategoryMessageIds);

    const EmailPromisesForAllTypes = [];

    for (const emailType in emailTypesMap) {

      let emailPromise = new Promise(async (resolve, reject) => {

        logger.info(`Processing data for '${emailType}' type.`);

        let dataForEmailType;
        // step2: get data for each email type
        // Use switch case when new types are added.
        // ADD_NEW_EMAIL: introduce handling for any new email type to be added;
        if (emailType == config.email.emailTypes.ieltsFeedback.type) {

          dataForEmailType = await getDataForIeltsEmailType(emailTypesMap[emailType]);

        }

        if (dataForEmailType) {

          let emailPromisesACategory = dataForEmailType.map((data, index) => {
            return new Promise(async (resolve, reject) => {
              try {

                if (!data.status) {

                  throw new CustomEmailError(ApplicationErrors.RECORD_DATA_FETCHING_ERROR, null, null);

                }

                EmailService.validate(data);

                if (!(config.email.emailTypes[emailType] && config.email.emailTypes[emailType].templateId)) {

                  throw new CustomEmailError(ApplicationErrors.EMAIL_TEMPLATE_NOT_FOUND, null, null);

                }

                data["emailTemplateId"] = `dls-${config.dls.realm}-${config.dls.env}-${config.email.emailTypes[emailType].templateId}`;

                const recordLogger = Logger.getRecordLogger(messageId);

                recordLogger.info('Sending email for record.');
                // step3: send email for each category records;
                let res = await EmailService.sendTemplateEmailPromise(data);

                recordLogger.info('Email sent for record');

                resolve(res);

              } catch (e) {

                CommonUtil.handleError(e, emailTypesMap[emailType][index], { isRecordLevel: true, isFurtherComputationsNeeded: true });

                reject(e);
              }
            });

          });

          const emailPromisesForACategoryData = await Promise.allSettled(emailPromisesACategory);

          const fulfilledMessages = emailTypesMap[emailType].filter((_f, index) => emailPromisesForACategoryData[index].status === 'fulfilled');

          sucessfullyProcessedMessageIds = sucessfullyProcessedMessageIds.concat(fulfilledMessages.map(message => message.messageId));

          resolve(emailPromisesForACategoryData);

        } else {

          logger.info("No method implemented to fetch email data for" + emailType + "category");

          reject();
        }

      })

      EmailPromisesForAllTypes.push(emailPromise);

    }

    await Promise.allSettled(EmailPromisesForAllTypes);

    const failedRecords = event.Records.filter((record) => {
      return !sucessfullyProcessedMessageIds.includes(record.messageId);
    });

    if (failedRecords.length) {

      const successfullyProcessedRecords = event.Records.filter((record) => {
        return sucessfullyProcessedMessageIds.includes(record.messageId);
      });
      // step4: delete suce\cessfully processed records in case not all are processed successfully.
      return await CommonUtil.handleBatchFailure(successfullyProcessedRecords, failedRecords);

    }

    const retMessage = `Successfully processed '${event.Records.length}' records.`;

    logger.info(retMessage);

    return retMessage;

  } catch (e) {

    return CommonUtil.handleError(e, event.Records, { isRecordLevel: false });

  }

};

main(event1, {
  awsRequestId: "sample-request-id"
});
