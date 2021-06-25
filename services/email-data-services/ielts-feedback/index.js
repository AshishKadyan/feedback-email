const request = require('request').defaults({ strictSSL: false });
const config = require("../../../config/default.config");

const comproDlsSdk = require('comprodls-sdk');
async function getData(messages) {
    // Assumption: origId will not change or ieltsFeedback Email messages;
    const { org } = messages[0];
    const options = {
        orgid: org,
    };

    const comproDLS = comproDlsSdk.init(config.dls.env, config.dls.realm, options);

    const uniqueProducts = messages.map(item => item.productcode)
        .filter((value, index, self) => self.indexOf(value) === index);

    const uniqueUsers = messages.map(item => item.extStudentId)
        .filter((value, index, self) => self.indexOf(value) === index);

    const emailData = await Promise.all([getUsersData(uniqueUsers, comproDLS, org), getProductsData(uniqueProducts, comproDLS)]);

    const usersData = emailData[0];

    const productsData = emailData[1];

    return messages.map((message) => {
        let userData = usersData.filter((data) => {
            return data.value.userId == message["extStudentId"];
        })[0].value;

        let productData = productsData.filter((data) => {
            return data.value.productcode == message.productcode;
        })[0].value;

        let testName = productData.tests.filter((test) => {
            return test["item-code"] == message.entity["item-code"];
        })[0].name;

        const { email, first_name, last_name } = userData["user"];
        return {
            emailParams: {

                testName: testName,
                firstName: first_name,
                lastName: last_name,
                subject: `${first_name}, your ${testName} feedback is ready`,
            },
            receiverEmail: email,
        };
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

        resolve(getProductsData);


    });


}
module.exports = getData