import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('external_id')
      table.integer('amount')
      table.integer('discount_amount')
      table.integer('paid_amount')
      table.string('payment_method')
      table.integer('installments')
      table.datetime('expiredt_at')
      table.datetime('paid_at')
      table.string('payment_type')
      table.string('pix_url')
      table.string('status')
      table.string('pix_copy_code')
      table.dateTime('refunded_at')
      table.integer('refunded_amount')
      table.integer('order_id').unsigned().references('id').inTable('orders')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('removed_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
