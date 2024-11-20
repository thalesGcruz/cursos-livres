import { DateTime } from 'luxon'
import { column, BaseModel, hasMany, manyToMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import OrderItem from '#models/order_item'
import Coupon from '#models/coupon'
import User from './user.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare fullAmount: number

  @column()
  declare amount: number

  @column()
  declare discount: number

  @column()
  declare status: string

  @column()
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @manyToMany(() => Coupon)
  declare coupons: ManyToMany<typeof Coupon>
}
