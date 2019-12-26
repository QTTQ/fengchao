const router = require('koa-router')();
const HomeController = require('./controller')


module.exports = (app) => {
    router.all('*', async (ctx, next) => {
        await next()
    });
    router.all("/createHomeDataParams", HomeController.createHomeDataParams);
    app.use(router.routes()).use(router.allowedMethods())
}