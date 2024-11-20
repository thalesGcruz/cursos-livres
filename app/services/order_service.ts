import Order from '#models/order'
import OrderItem from '#models/order_item'
import { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class OrderService {
  constructor(private ctx: HttpContext) {}

  async store(data: any) {
    try {
      const order = await Order.create(data)
      return order.serialize()
    } catch (error) {
      return this.ctx.response.send(error)
    }
  }

  async findByUser(id: any) {
    try {
      const query = Order.query()
      query.where('user_id', id)
      query.where('orders.status', 'active')
      query.preload('coupons', (couponsQuery) => {
        couponsQuery.where('coupons.status', 'active')
      })
      query.preload('orderItems', (orderItemsQuery) => {
        orderItemsQuery.where('order_items.status', 'active')
        orderItemsQuery.preload('course')
      })
      const order = await query.firstOrFail()
      return order.serialize({
        fields: ['id', 'status', 'full_amount', 'amount', 'discount'],
        relations: {
          orderItems: {
            fields: ['id', 'course', 'quantity', 'amount', 'full_amount'],
            relations: {
              course: {
                fields: ['id', 'name', 'description', 'status', 'imgUrl'],
              },
            },
          },
        },
      })
    } catch (error) {
      return error
    }
  }

  async refresh(id: any) {
    try {
      const order = await Order.query()
        .where('id', id)
        .where('orders.status', 'active')
        .preload('orderItems', (orderItemsQuery) => {
          orderItemsQuery.where('order_items.status', 'active')
        })
        .preload('coupons', (couponsQuery) => {
          couponsQuery.where('coupons.status', 'active')
        })
        .first()

      const { orderItems = [], coupons = [] } = order || {}
      const someItems = orderItems.reduce((total: number, item: OrderItem) => {
        return total + item?.fullAmount
      }, 0)

      let discount = 0
      coupons.map((cupom) => {
        discount = discount + (Number(someItems) * Number(cupom.value)) / 100
      })

      // garantir que o total de desconto não ira
      // ultrapassar o valor total do pedido
      discount = discount > someItems ? someItems : discount
      const fullAmount = someItems - discount
      const orderUpdated = await order
        ?.merge({
          fullAmount: fullAmount,
          discount: discount,
          amount: someItems,
        })
        .save()

      return orderUpdated
    } catch (error) {
      return error
    }
  }
}
