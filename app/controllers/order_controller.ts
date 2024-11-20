import OrderService from '#services/order_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class OrderController {
  constructor(private order: OrderService) {}

  async show() {}

  async info({ response, auth }: HttpContext) {
    try {
      const id = auth?.user?.id
      const order = await this.order.findByUser(id)
      return response.send(order)
    } catch (error) {
      console.log(error)
      response.status(error.status).send(error)
    }
  }
}
