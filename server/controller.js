const util = require('./util')
const homeDataParams = 'homeDataParams.json'

module.exports = {
    createHomeDataParams: async (ctx, next) => {
        let postBody = ctx.request.body
        let OldJsonData = await util.readJsonFnSync(homeDataParams)
        if (postBody != undefined) {
            await util.writeJsonFnSync(homeDataParams, { ...OldJsonData, ...postBody })
            ctx.body = {
                msg: '保存成功',
                code: 0
            };
        } else {
            ctx.body = {
                msg: '参数不对',
                code: 1
            };
        }
    },
    // index: async (ctx, next) => {
    //     // console.log('query:',ctx.request.query);
    //     // console.log('querystring:',ctx.request.querystring[0]);
    //     // console.log('params:',ctx.params);
    //     // let data = await HomeService.index(ctx,user)
    //     // console.log('data:',data);
    //     // await ctx.render('home/login1',{data})
    //     let data = '新年快乐,早点回家'
    //     await ctx.render('home/index', { data })
    // },
    // login_in: async (ctx, next) => {
    //     let data = '请登录账号'
    //     await ctx.render('home/login', { data })
    // },
    // login: async (ctx, next) => {
    //     // console.log('query:',ctx.request.query);
    //     // console.log('querystring:',ctx.request.querystring[0]);
    //     // console.log('params:',ctx.params);
    //     var user = {
    //         name: ctx.request.body.name,
    //         pass: ctx.request.body.password,
    //         // repeatpass: ctx.request.body.repeatpass
    //     }
    //     console.log('login:', await HomeService.login(ctx, user));
    //     await HomeService.login(ctx, user)
    // },
    // login_success_index: async (ctx, next) => {
    //     await ctx.render('home/loginSuccess_index')
    // },
    // register_in: async (ctx, next) => {
    //     let data = '请注册账号'
    //     await ctx.render('home/register', { data })
    // },
    // register: async (ctx, next) => {
    //     let user = {
    //         name: ctx.request.body.name,
    //         pass: ctx.request.body.password,
    //     }
    //     console.log('ctx.request.body:', ctx.request.body);
    //     await HomeService.register(ctx, user)
    // }
}