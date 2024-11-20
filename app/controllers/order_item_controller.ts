import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import OrderItemService from '#services/order_item_service'
import { createOrderItemValidator } from '#validators/order_item'

@inject()
export default class OrderItemController {
  constructor(private orderItem: OrderItemService) {}

  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(createOrderItemValidator)
      const item = await this.orderItem.store(data)
      return response.send(item)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async delete({ response, request }: HttpContext) {
    try {
      const itemDeleted = await this.orderItem.delete(request.param('id'))
      return response.send(itemDeleted)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}
