const AWSSQS = require('aws-sdk/clients/sqs');
const Ajv = require('ajv');
const config = require('../config/default.config');
const ApplicationErrors = require('./application-errors');
const CustomEmailError = require('./custom-error.util');
const ajv = new Ajv({ allErrors: true, jsonPointers: true });
const { Logger } = require('../utilities/logger.util')

//TODO: check what ajv does
require('ajv-errors')(ajv);



const sqs = new AWSSQS();

/**
 * Utils Class
 */
class CommonUtil {

  /**
  * This method will handle the failed messages.
  */
  static async handleBatchFailure(recordsToDelete, failedMessageIds) {

    const sucessMessageIds = [];

    const entriesToDelete = recordsToDelete.map((messageToDelete) => {
      Logger.getRecordLogger(messageToDelete.messageId).info('Started deleting record.');
      return {
        Id: messageToDelete.messageId,
        ReceiptHandle: messageToDelete.receiptHandle
      };
    });
    
    if (entriesToDelete.length) {
      const deleteMsgRes = await sqs.deleteMessageBatch({
        Entries: entriesToDelete,
        QueueUrl: config.scoreQueueUrl
      }).promise();

      deleteMsgRes.Successful.forEach((record) => {
        sucessMessageIds.push(record.Id);
        Logger.getRecordLogger(record.Id).info('Successfully deleted record from queue.');
      });

      deleteMsgRes.Failed.forEach((record) => {
        failedMessageIds.push(record.Id);
        Logger.getRecordLogger(record.Id).info('Failed to delete record from queue.');
      });
    }


    // need to throw here so that the all the batch does not vanish from SQS.
    throw new CustomEmailError(ApplicationErrors.BATCH_PROCESSING_FAILED, null, {
      info: {
        SuccessfulMessageIds: sucessMessageIds,
        FailedMessageIds: failedMessageIds
      }
    });
  }

  /**
  * This method will handle the failed messages.
  * if recordData has messageId, it will initialize logger with recordLevel data and use it for logging the error.
  * if options has isFutherComputationsRequired set as true, it will not throw the error and only log it.
  */
  static handleError(error, recordData, options) {
    const logger = options.isRecordLevel ? Logger.getRecordLogger(recordData.messageId) : Logger.getLogger();
    let errCode;
    let errMsg;

    if (error instanceof CustomEmailError) {
      errCode = error.errorCode;
      errMsg = JSON.stringify(error);
    }
    else {
      errCode = 'INTERNAL_SERVER_ERROR';
      let errorInfo;
      if (options.isRecordLevel) {
        errorInfo = recordData;
      }
      else {
        errorInfo = recordData.reduce((acc, record) => {
          acc.push({
            messageId: record.messageId,
            Attempt: record.attributes.ApproximateReceiveCount
          });
          return acc;
        }, []);
      }
      const errorObj = {
        message: error.message,
        ...error,
        errorInfo
      };
      errMsg = JSON.stringify(errorObj);
    }
    logger.error({ err: error }, `Error Type= ${errCode}, Error= ${errMsg}`);
    if (options.isFurtherComputationsNeeded) {
      return;
    }
    throw error;
  }
}

module.exports = CommonUtil;
