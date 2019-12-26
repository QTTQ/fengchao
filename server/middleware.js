const bodyParser = require('koa-bodyparser');

module.exports = (app) => {
    // // 注册中间件
    // // 应用请求错误中间件
    // app.use(miHttpError())
    // app.use(miLog(app.env, {
    //     env: app.env,
    //     projectName: 'koa2-tutorial',
    //     appLogLevel: 'debug',
    //     dir: 'logs',
    //     serverIp: ip.address()
    // }));
    // app.use(staticFiles(path.resolve(__dirname, "../public")))
    // app.use(nunjucks({
    //     ext: 'html',
    //     path: path.join(__dirname, '../views'),
    //     nunjucksConfig: {
    //         trimBlocks: true
    //     }
    // }));
    app.use(bodyParser())
    // app.use(miSend())
}