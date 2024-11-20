import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

@inject()
export default class UserService {
  constructor(private ctx: HttpContext) {}

  async store(data: any) {
    try {
      const user = await User.create(data)
      return user.serialize()
    } catch (error) {
      this.ctx.response.status(error.status).send(error)
    }
  }
}
