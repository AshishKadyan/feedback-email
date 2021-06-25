
let cachedBundles = {};

async function getBundle(comproDLS,bundleId) {
    if(cachedBundles[bundleId])
    return cachedBundles[bundleId]
    // TODO remove accountId hardcoding
  
    let bundle = await comproDLS.Product("cup1").getSingleBundle({
        "bundle-code": bundleId
      });

    setBundle(bundleId, bundle)

    return cachedBundles[bundleId]
 
}

function setBundle(bundleId, data){

    //TODO only set requiredData
    let products = data.products.map((product)=>{
       return product["dls-product"]["code"];
    })
    cachedBundles[bundleId] = {};
    cachedBundles[bundleId]["products"] = products;
}
exports.getBundle = getBundle;