const ApplicationErrors = {
    UNSUPPORTED_MESSAGE_TYPE: {
      message: 'Unsupported message type.',
      code: 'UNSUPPORTED_MESSAGE_TYPE'
    },
    INCORRECT_LINE_ITEM_ID_FORMAT: {
      message: 'Invalid Line item id format.',
      code: 'INCORRECT_LINE_ITEM_ID_FORMAT'
    },
    INCORRECT_CONTEXT_ID_FORMAT: {
      message: 'Invalid Context id format.',
      code: 'INCORRECT_CONTEXT_ID_FORMAT'
    },
    BATCH_PROCESSING_FAILED: {
      message: 'Failed to process records.',
      code: 'BATCH_PROCESSING_FAILED'
    },
    EMAIL_DATA_FETCHING_ERROR: {
      message: 'Could not fetch data for the record',
      code: 'EMAIL_DATA_FETCHING_ERROR'
    },
    EMAIL_TEMPLATE_NOT_FOUND:{
        message: 'Email Template not found',
        code: 'EMAIL_TEMPLATE_NOT_FOUND'
    }
  };
  
  module.exports = ApplicationErrors;
  