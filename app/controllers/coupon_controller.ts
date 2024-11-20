import { inject } from '@adonisjs/core'
import { CouponService } from '#services/coupon_service'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CouponController {
  constructor(private coupon: CouponService) {}

  async store({ request, response }: HttpContext) {
    try {
      const data = request.body()
      const coupon = this.coupon.store(data)
      return coupon
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async delete({ response, request }: HttpContext) {
    try {
      const coupon = this.coupon.delete(request.param('code'))
      return coupon
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}
