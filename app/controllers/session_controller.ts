import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SessionService from '#services/session_service'
import { createSessionValidator } from '#validators/session'
import { createUserValidator } from '#validators/user'
import UserService from '#services/user_service'

@inject()
export default class SessionController {
  constructor(
    private session: SessionService,
    private user: UserService
  ) {}

  async loginPage({ inertia }: HttpContext) {
    return inertia.render('home')
  }

  // create({ request } : HttpContext){
  // retornar tela de login
  // }

  async register({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)
      const user = await this.user.store(data)
      return response.send(user)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  async login({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createSessionValidator)
      const user = await this.session.login(data)
      return response.send(user)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async logout({ response }: HttpContext) {
    try {
      return this.session.logout()
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}
