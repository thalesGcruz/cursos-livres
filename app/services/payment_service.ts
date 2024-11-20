import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import { CreateOrderRequest, ApiError } from '@pagarme/pagarme-nodejs-sdk'
import { ordersController } from '../lib/pagarme_lib.js'
import Payment from '#models/payment'

@inject()
export default class PaymentService {
  constructor(private ctx: HttpContext) {}

  async storePix() {
    try {
      const order = await Order.query()
        .where('user_id', this.ctx.auth.user.id)
        .where('orders.status', 'active')
        .preload('user')
        .preload('user', (userQuery) => {
          userQuery.preload('addresses', (addressesQuery) => {
            addressesQuery.where('addresses.status', 'active').first()
          })
        })
        .preload('orderItems', (orderItemsQuery) => {
          orderItemsQuery.where('order_items.status', 'active')
          orderItemsQuery.preload('course')
        })
        .first()

      if (order) {
        const items = order?.orderItems?.map((item: any) => {
          return {
            amount: item.amount,
            description: item.course.name,
            quantity: item.quantity,
            code: item.course.id.toString(),
            category: 'cursos livres',
          }
        })

        const body: CreateOrderRequest = {
          closed: true,
          code: order.id.toString(),
          items: items,
          customer: {
            name: order.user.fullName,
            email: order.user.email,
            code: order.user.id.toString(),
            type: 'individual',
            documentType: 'CPF',
            document: order.user.document,
            phones: {
              mobilePhone: {
                countryCode: order.user.phone.substring(0, 2),
                areaCode: order.user.phone.substring(2, 4),
                number: order.user.phone.substring(4),
              },
            },
            address: {
              country: 'BR',
              state: order.user.addresses[0].state,
              city: order.user.addresses[0].city,
              zipCode: order.user.addresses[0].zipcode,
              neighborhood: order.user.addresses[0].neighborhood,
              number: order.user.addresses[0].number.toString(),
              street: order.user.addresses[0].streetName,
              complement: '',
              line1: '',
              line2: '',
            },
            metadata: {},
          },
          payments: [
            {
              paymentMethod: 'pix',
              amount: order?.fullAmount,
              pix: { expiresIn: 900 },
            },
          ],
        }

        const { result } = await ordersController.createOrder(body)
        const payment = await Payment.create({
          externalId: '1',
          userId: 1,
          amount: Number(order.amount),
          paidAmount: order.fullAmount,
          discountAmount: order.discount,
          paymentMethod: 'pix',
          status: 'pending',
          paymentType: 'gateway',
          orderId: order.id,
          pixUrl: result.charges[0].lastTransaction.qrCodeUrl,
        })
        return payment
      }
    } catch (error) {
      // if (error instanceof ApiError) {
      //   const erro = error.result;
      //   const { statusCode, headers } = error;
      //   return NextResponse.json(erro, { status: 400 })
      // }
      return error
    }
  }

  async storeCreditCard() {
    //
  }
}
