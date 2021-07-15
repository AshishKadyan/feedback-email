
const config = require("../config/default.config")

const AWS = require('aws-sdk');
const emailClient = new AWS.SES();
/**
 * EmailService Class
 */
class EmailService {

    static getEmailDataObj() {
        return {
            status: null,
            emailParams: {
            },
            messageId: null,
            receiverEmail: null
        }
    }

    static validate(data) {
        if (!data.receiverEmail || !data.emailParams || !data.messageId) {
            throw new CustomEmailError(ApplicationErrors.SCHEMA_VALIDATION_ERROR, null, null);
        }
    }
    // seggregates emails based on  types.
    static seggregateRecordsByEmailType(messages) {
        let map = {};
        let noCategoryMessageIds = [];
        messages.forEach(message => {
            const emailType = this.getEmailTypeForMessage(message);
            if (emailType) {
                if (!map[emailType]) {
                    map[emailType] = [];
                }
                map[emailType].push(message);
            } else {
                noCategoryMessageIds.push(message.messageId)
            }
        });
        return { emailTypesMap: map, noCategoryMessageIds: noCategoryMessageIds };
    }

    static getEmailTypeForMessage(message) {

        // check for ieltsFeedbackType message
        if ((message["entity"]["verb"] == "evaluated_external")
            && (message["bundle-codes"] && message["bundle-codes"].includes(config.ieltsBundleCode))
            && (message["entity"]["part"] == 2)
        ) {
            return config.email.emailTypes.ieltsFeedback.type;
        }

        return undefined;
    }
    static async sendTemplateEmailPromise(emailData) {

        const options = {
            templateId: emailData.emailTemplateId,
            senderEmail: config.email.senderEmail,
            receiverEmail: emailData.receiverEmail,
            templateData: {
                staticAssetsBasePath: config.email.staticAssetsBasePath,
                appsBasepath: config.email.appsBasepath,
            }
        };

        this.shallowCopy(options.templateData, emailData.emailParams)

        const emailParams = this.createParamsForEmail(options);

        const response = await emailClient.sendTemplatedEmail(emailParams).promise();

        return { success: true, response: response };


    }

    static createParamsForEmail(options) {
        return {
            Destination: {
                ToAddresses: [options.receiverEmail]
            },
            Source: options.senderEmail,
            Template: options.templateId,
            TemplateData: JSON.stringify(options.templateData)
        };
    }

    static shallowCopy(target, source) {
        Object.keys(source).forEach((key) => {
            target[key] = source[key]
        })
    }
}
module.exports = EmailService;
