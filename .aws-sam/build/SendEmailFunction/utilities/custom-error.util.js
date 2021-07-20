/**
 * Class for defining custom Score Transformations Errors
 */
 class CustomEmailError extends Error {
    /**
       * Constructor to inititialize the custom errors
       * @param {object} errorObject
       * @param {object} originalError
       */
    constructor(errorObject, originalError, options) {
      super(errorObject.message);
      this.name = this.constructor.name;
      if (originalError) {
        this.originalError = {
          message: originalError.message,
          stack: originalError.stack,
          ...originalError
        };
      }
      this.errorCode = errorObject.code;
      this.errorInfo = options && options.info;
    }
  }
  
  module.exports = CustomEmailError;
  