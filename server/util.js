const jsonfile = require('jsonfile')
const fs = require('fs');

//读取json
async function readJsonFnSync(homeDataParams) {
    return await jsonfile.readFileSync(homeDataParams)
}

async function writeJsonFnSync(homeDataParams, obj) {
    //写json
    return await jsonfile.writeFileSync(homeDataParams, obj)
}
async function hadFileFn(path, name) {
    return await fs.existsSync(path, name)
}
async function createFileFn(path, name, suffixName = ".json") {
    return new Promise(function (resolve, reject) {
        // fs.writeFile(path + name + suffixName, "hello world!", (err) => {
        fs.writeFile(path + name + suffixName, "", (err) => {
            if (err) {
                console.log(err);
                reject(false)
            }
            resolve(true)
        });
    })
}

module.exports = {
    readJsonFnSync,
    writeJsonFnSync,
    createFileFn,
    hadFileFn
}