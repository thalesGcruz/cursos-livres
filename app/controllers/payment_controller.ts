import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PaymentService from '#services/payment_service'

@inject()
export default class PaymentController {
  constructor(private payment: PaymentService) {}

  async pix({ response }: HttpContext) {
    try {
      const payment = await this.payment.storePix()
      return response.send(payment)
    } catch (error) {
      return response.send(error)
    }
  }

  async creditCard({ response }: HttpContext) {
    try {
      //
      // const coupon = this.coupon.delete(request.param('code'))
      // return coupon
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}
