import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coupon_order'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('coupon_id').unsigned().references('id').inTable('coupons')
      table.unique(['order_id', 'coupon_id'])
      table.string('status')
      table.dateTime('removed_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('removed_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
