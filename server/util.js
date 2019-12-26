const jsonfile = require('jsonfile')

//读取json
async function readJsonFnSync(homeDataParams) {
    return await jsonfile.readFileSync(homeDataParams)
}

async function writeJsonFnSync(homeDataParams, obj) {
    //写json
    return await jsonfile.writeFileSync(homeDataParams, obj)
}


module.exports = {
    readJsonFnSync,
    writeJsonFnSync,
}