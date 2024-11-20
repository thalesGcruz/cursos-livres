import { inject } from '@adonisjs/core'
import OrderService from './order_service.js'
import Coupon from '#models/coupon'
import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'

@inject()
export class CouponService {
  constructor(
    private ctx: HttpContext,
    private order: OrderService
  ) {}

  async store(data: any) {
    try {
      const { code } = data
      const coupon = await Coupon.query().where({ code: code, status: 'active' }).first()
      const order = await Order.query()
        .where('user_id', this.ctx.auth.user?.id)
        .where('status', 'active')
        .first()

      await order?.related('coupons').attach({
        [coupon.id]: {
          status: 'active',
        },
      })
      await coupon?.merge({ timesUsed: coupon.timesUsed + 1 }).save()
      const orderUpdated = await this.order.refresh(order?.id)
      return orderUpdated
    } catch (error) {
      return error
    }
  }

  async delete(code: any) {
    try {
      const coupon = await Coupon.query().where({ code: code, status: 'active' }).first()
      const order = await Order.query()
        .where('user_id', this.ctx.auth.user?.id)
        .where('status', 'active')
        .first()

      await order?.related('coupons').detach([coupon.id])
      await coupon?.merge({ timesUsed: coupon.timesUsed - 1 }).save()
      const orderUpdated = await this.order.refresh(order?.id)
      return orderUpdated
    } catch (error) {
      return error
    }
  }
}
