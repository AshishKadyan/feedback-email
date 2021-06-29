const config = {
  dls: {
    env: process.env.DLS_ENV || "thor",
    realm: process.env.DLS_REALM || "asgard",
    accountId: process.env.ACCOUNT_ID || "cup1"
  },
  scoreQueueUrl: process.env.SCORE_Q_URL,
  Logger: {
    bunyan: {
      name: process.env.BUNYAN_LOG_NAME || 'send-c1-emails-worker',
      logLevel: process.env.BUNYAN_LOG_LEVEL || 'info'
    }
  },
  email:{
    staticAssetsBasePath: process.env.STATIC_ASSETS_BASEPATH,
    appsBasepath: process.env.APPS_BASEPATH,
    senderEmail: 'Cambridge One <' + process.env.EMAIL_ADDRESS_GENERAL + '>',
    emailTypes : {
      ieltsFeedback: {
        templateId: "ieltsFeedbackTemplate",
        type: "ieltsFeedback",
      }
    }
  },
  ieltsBundleCode:"ielts_bundle"
};

module.exports = config;
