const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
router.get('/api/userinfo', async (ctx, next) => {
  ctx.body = {
    success: true,
    data: {
      name: 'Churjan',
      age: 26
    }
  }
})
app.use(router.routes())
app.listen(3000)
