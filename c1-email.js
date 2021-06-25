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

    let messageArray = event.Records.map((record, index) => {

      const bodyObj = JSON.parse(record.body);
      const scoreObj = JSON.parse(bodyObj.Message);
      scoreObj["index"] = index;
      scoreObj["messageId"] = record.messageId;
      return scoreObj

    });
    let sucessfullyProcessedMessageIds = [];
    // step1: seggregateRecordsByEmailType
    const { emailTypesMap, noCategoryMessageIds } = EmailService.seggregateRecordsByEmailType(messageArray);

    sucessfullyProcessedMessageIds = sucessfullyProcessedMessageIds.concat(noCategoryMessageIds);


    const sendEmailPromisesForAllTypes = [];

    for (const emailType in emailTypesMap) {

      let emailPromise = new Promise(async (resolve, reject) => {

        let dataForEmailType;

        if (emailType == config.email.emailTypes.ieltsFeedback.type) {
          dataForEmailType = await getDataForIeltsEmailType(emailTypesMap[emailType]);
        }
        if (dataForEmailType) {

          let emailPromisesForType = dataForEmailType.map((data) => {
            return new Promise(async (resolve, reject) => {
              try {
                data["emailTemplateId"] = `dls-${config.dls.realm}-${config.dls.env}-${config.email.emailTypes[emailType].templateId}`
                //TODO: remove this temp change;
                let res = await EmailService.sendTemplateEmailPromise(data)
                resolve(res)
              } catch (err) {
                reject(err);
              }
            });

          });

          const emailPromisesForATypeData = await Promise.allSettled(emailPromisesForType);

          const fulfilledMessages = emailTypesMap[emailType].filter((_f, index) => emailPromisesForATypeData[index].status === 'fulfilled');

          sucessfullyProcessedMessageIds = sucessfullyProcessedMessageIds.concat(fulfilledMessages.map(message => message.messageId));

          resolve(emailPromisesForATypeData)

        } else {
          reject("No method implemented to fetch email data for" + emailType + "category")
        }

      })

      sendEmailPromisesForAllTypes.push(emailPromise)

    }
    const sendEmailPromisesForAllTyoesData = await Promise.allSettled(sendEmailPromisesForAllTypes);

    console.log(sendEmailPromisesForAllTyoesData)

    // const isAnyMsgFailed = sendEmailPromisesData.some((msgPromise) => msgPromise.status === 'rejected');
    const isAnyMsgFailed = event.Records.length != sucessfullyProcessedMessageIds.length;

    if (isAnyMsgFailed) {
      // TODO: delete successfully processed messages;
      const successfullyProcessedRecords = event.Records.filter((record) => {
        return sucessfullyProcessedMessageIds.includes(record.messageId);
      })
      const failedRecords = event.Records.filter((record) => {
        return !sucessfullyProcessedMessageIds.includes(record.messageId);
      })
      return await CommonUtil.handleBatchFailure(successfullyProcessedRecords,failedRecords);
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
