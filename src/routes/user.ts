import * as Koa from 'koa'
import { get, post, middlewares } from '../utils/route-decors'
import { validate } from '../utils/validate'
import { createContext } from 'vm'

const users = [{ name: 'tom' }]

// @middlewares([
//   async (ctx, next) => {
//     console.log('guard', ctx.header)
//     if (ctx.header.token) {
//       await next()
//     } else {
//       throw '请登录'
//     }
//   }
// ])
export default class User {

  @get('/users')
  @validate({
    name: { type: "string", required: true }
  })
  public list(ctx: Koa.context) {
    ctx.body = { ok: 1, data: users }
  }
  @post('/users', {
    middlewares: [
      async (ctx, next) => {
        const name = ctx.request.body.name
        // 用户名必须
        if (!name) {
          throw '请输出用户名'
        } else {
          await next()
        }
      }
    ]
  })
  public add(ctx: Koa.contest) {
    users.push(ctx.request.body)
    ctx.body = { ok: 1 }
  }
  public findName(name: string) {

  }
}