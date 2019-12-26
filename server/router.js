const router = require('koa-router')();
// const HomeController = require('./../controller/home')


module.exports = (app) => {
    router.all('*', async (ctx, next) => {
        await next()
    });
    router.get("/createHomeDataParams", (ctx, next) => {
        console.log("homepage");
    });
    app.use(router.routes()).use(router.allowedMethods())
}