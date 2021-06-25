
const config = require("../config/default.config")
let cachedProducts = {};


async function getProduct(comproDLS,productId) {
    if(cachedProducts[productId])
    {
        return cachedProducts[productId]
    }

    let params = { 'productcode': productId };
    // TODO: remove accountId hardcoding;
    let product = await comproDLS.Product("cup1").getProduct(params);

    setProduct(productId, product)

    return cachedProducts[productId]
 
}

function setProduct(productId, data){

    //TODO only set requiredData

    cachedProducts[productId] = data;
}
exports.getProduct = getProduct