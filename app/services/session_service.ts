import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

@inject()
export default class SessionService {
  constructor(private ctx: HttpContext) {}

  async login({ email, password }: { email: string; password: string }) {
    try {
      const user = await User.verifyCredentials(email, password)
      await this.ctx.auth.use('web').login(user)
      return user.serialize()
    } catch (error) {
      this.ctx.response.send(error)
    }
  }

  async logout() {
    try {
      await this.ctx.auth.use('web').logout()
      return {}
    } catch (error) {
      this.ctx.response.status(error.status).send(error)
    }
  }
}
