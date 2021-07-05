const bunyan = require('bunyan');

const config = require('../config/default.config');

/**
 * This serializer will be used to log lambda event's properties for error scenario
 * @param {*} error
 */
function errorEventSerializer(error) {
  if (!error) {
    return {};
  }
  return {
    ...(error.message && { message: error.message }),
    ...(error.name && { name: error.name }),
    ...(error.stack && { stack: error.stack })
  };
}
// Option for logging
const loggerOptions = {
  name: config.Logger.bunyan.name,
  level: config.Logger.bunyan.logLevel,
  serializers: {
    err: errorEventSerializer
  }
};

const bunyanLog = bunyan.createLogger(loggerOptions);
let syslog;
let recordLogs;

/**
 * This function will initialize the child logger
 * @param {*} context
 */
function init(context) {
  recordLogs = {}; // resetting recordLogs object
  const logContext = {};
  logContext.start_time = Date.now();
  logContext.request_id = `executionId=${context.awsRequestId}`;
  syslog = bunyanLog.child(logContext);
}

/**
 * This function will initialize the child logger
 * @param {*} context
 */
function initRecordLogger(context, record, body) {
  if (!record) {
    return;
  }
  const logContext = {};
  logContext.messageId = record.messageId;
  // added check for record.attributes
  logContext.attempt = record.attributes && record.attributes.ApproximateReceiveCount;
  logContext.request_id = `executionId=${context.awsRequestId}`;
  if (body.MessageAttributes && body.MessageAttributes.x_amzn_trace_id && body.MessageAttributes.x_amzn_trace_id.Value) {
    logContext.request_id += `;${body.MessageAttributes.x_amzn_trace_id.Value}`;
  }
  recordLogs[logContext.messageId] = syslog.child(logContext);
}

/**
 * Getter for syslog
 */
function getLogger() {
  return syslog;
}

/**
 * Getter for syslog
 */
function getRecordLogger(identifier) {
  return recordLogs[identifier];
}

exports.Logger = {
  init,
  getLogger,
  initRecordLogger,
  getRecordLogger
};
