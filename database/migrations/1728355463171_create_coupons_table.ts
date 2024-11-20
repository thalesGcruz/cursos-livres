import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'coupons'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('code')
      table.integer('value')
      table.string('status')
      table.integer('limit_user')
      table.integer('times_used')
      table.dateTime('validate_at')
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
