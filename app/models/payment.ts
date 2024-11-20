import { DateTime } from 'luxon'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import User from './user.js'
export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare externalId: string

  @column()
  declare userId: number

  @column()
  declare orderId: number

  @column()
  declare amount: number

  @column()
  declare discountAmount: number

  @column()
  declare paidAmount: number

  @column()
  declare paymentMethod: string

  @column()
  declare installments: number

  @column()
  declare status: string

  @column.dateTime()
  declare paidAt: DateTime

  @column.dateTime()
  declare expiredtAt: DateTime

  @column()
  declare paymentType: string

  @column()
  declare pixUrl: string

  @column()
  declare pixCopyCode: string

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
