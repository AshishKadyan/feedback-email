const request = require('request').defaults({ strictSSL: false });
const config = require("../../../config/default.config");
const EmailService = require("../../../services/email-service");
const comproDlsSdk = require('comprodls-sdk');
const { Logger } = require('../../../utilities/logger.util');

const CommonUtil = require('../../../utilities/common.util');

async function getData(messages) {
    // Assumption: origId will not change or ieltsFeedback Email messages;
    const { org } = messages[0];

    const options = {
        orgid: org,
    };

    const comproDLS = comproDlsSdk.init(config.dls.env, config.dls.realm, options);
    // filter out unique products
    const uniqueProducts = messages.map(item => item.productcode)
        .filter((value, index, self) => self.indexOf(value) === index);
    // filter out unique users
    const uniqueUsers = messages.map(item => item.extStudentId)
        .filter((value, index, self) => self.indexOf(value) === index);
    // get data for unique users and products
    const emailData = await Promise.all([getUsersData(uniqueUsers, comproDLS, org), getProductsData(uniqueProducts, comproDLS)]);

    const usersData = emailData[0];


    const productsData = emailData[1];

    return messages.map((message, index) => {
        let data = EmailService.getEmailDataObj();
        try {

            let userData = usersData.filter((data) => {
                return data.value.userId == message["extStudentId"];
            })[0].value;

            let productData = productsData.filter((data) => {
                return data.value.productcode == message.productcode;
            })[0].value;

            let testName = productData.tests.filter((test) => {
                return test["item-code"] == message.entity["item-code"];
            })[0].name;

            let feedbackURL = `ieltsi/${message["extStudentId"]}/product/${message.productcode}/test/${message.entity["item-code"]}/results`;

            const { email, first_name, last_name } = userData["user"];
            data.status = true;
            data.emailParams = {
                testName: testName,
                firstName: first_name,
                lastName: last_name,
                subject: `${first_name}, your ${testName} feedback is ready`,
                feedbackURL:feedbackURL
            };
            data.receiverEmail = email;
        } catch (err) {

            CommonUtil.handleError(err, message, { isRecordLevel: true, isFurtherComputationsNeeded: true });

            data.status = false;
        }

        return data;

    })

}

async function getUsersData(users, comproDLS, orgId) {
    return new Promise(async (resolve, reject) => {
        const getUserDataPromises = users.map((user) => {

            return new Promise(async (resolve, reject) => {
                try {
                    const provisionParams = {
                        "ext_user_id": user
                    };

                    const provisioningResponse = await comproDLS.authWithExtUser(orgId, provisionParams, {});

                    provisioningResponse["userId"] = user;

                    resolve(provisioningResponse);

                } catch (e) {
                    reject(e);
                }

            })

        })

        const usersData = await Promise.allSettled(getUserDataPromises);
        // In case of any failed requests, log it
        const userDataFailedMessages = usersData.forEach((msgPromise, index) => {
            if (msgPromise.status === 'rejected') {
                const logger = Logger.getLogger();
                logger.error("Error fetching data for user-id: " + users[index] + " ErrorDetails: " + JSON.stringify(msgPromise.reason));
            }
        }
        );


        resolve(usersData);


    });
}
async function getProductsData(products, comproDLS) {
    return new Promise(async (resolve, reject) => {
        let productsDataPromises = products.map((productCode) => {

            return new Promise(async (resolve, reject) => {
                try {
                    let params = { 'productcode': productCode };

                    let product = await comproDLS.Product(config.dls.accountId).getProduct(params);

                    const flattenedJSONURL = product.meta.paths['json-flattened'];
                    request(flattenedJSONURL, { json: true }, (err, response, body) => {
                        if (err || response.statusCode != 200) {
                            reject(err)
                        } else {
                            // For a user not entitled, getProductData call fetches the entire list of tests.
                            let tests = response.body.items.default;

                            resolve({
                                productcode: productCode,
                                tests: tests,
                            });
                        }
                    });
                } catch (e) {
                    reject(e);
                }

            })

        })

        const getProductsData = await Promise.allSettled(productsDataPromises);
        // In case of any failed requests, log it
        getProductsData.forEach((msgPromise, index) => {
            if (msgPromise.status === 'rejected') {
                const logger = Logger.getLogger();
                logger.error("Error fetching data for product: " + products[index] + " ErrorDetails: " + JSON.stringify(msgPromise.reason))
            }
        }
        );

        resolve(getProductsData);


    });


}
module.exports = getData