import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'materials'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.text('description')
      table.string('type')
      table.string('status')
      table.integer('duration')
      table.text('material_url')
      table.integer('module_id').unsigned().references('id').inTable('modules')
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
