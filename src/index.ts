import * as Koa from 'koa'
import * as bodify from 'koa-body'
import * as serve from 'koa-static'
import * as timing from 'koa-xtime'

const app = new Koa()
app.use(serve(`${__dirname}/public`))

app.use(bodify({
  multipart: true,
  strict: false,
}))

import { load } from './utils/route-decors'
import { resolve } from 'path'

const router = load(resolve(__dirname, './routes'))
app.use(router.routes())

app.listen(3000, () => {
  console.log(`服务器启动成功，端口： 3000`)
})