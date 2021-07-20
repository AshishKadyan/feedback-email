const config = {
  dls: {
    env: process.env.DLS_ENV,
    realm: process.env.DLS_REALM,
    accountId: process.env.ACCOUNT_ID
  },
  emailQueueUrl: process.env.EMAIL_Q_URL, // from template.yaml
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
        templateId: "ielts-feedback",
        type: "ieltsFeedback",
      }
    }
  },
  ieltsBundleCode:"ielts_bundle"
};

module.exports = config;
