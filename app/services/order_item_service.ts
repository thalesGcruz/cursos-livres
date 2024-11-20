import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import OrderService from './order_service.js'
import CourseService from './course_service.js'
import OrderItem from '#models/order_item'

@inject()
export default class OrderItemService {
  constructor(
    private ctx: HttpContext,
    private order: OrderService,
    private course: CourseService
  ) {}

  async store(data: any) {
    const { courseId, quantity = 1, status = 'active' } = data
    let order = await this.order.findByUser(this.ctx.auth?.user?.id)
    let course = await this.course.findById(courseId)
    // se não encontrar um carrinho ativo criar um novo com status ativo
    if (!order) {
      order = await this.order.store({
        userId: this.ctx.auth?.user?.id,
        amount: 0,
        fullAmount: 0,
        discount: 0,
        status: 'active',
      })
    }
    const item = await OrderItem.create({
      orderId: order?.id,
      courseId: course?.id,
      quantity: quantity,
      status: status,
      amount: course?.amount,
      fullAmount: quantity * course?.amount,
    })
    await this.order.refresh(order?.id)
    return item
  }

  async delete(id: number) {
    let item = await OrderItem.findBy('id', id)
    let itemDeleted = await item?.merge({ status: 'inactive' }).save()
    this.order.refresh(item?.orderId)
    return itemDeleted
  }
}
