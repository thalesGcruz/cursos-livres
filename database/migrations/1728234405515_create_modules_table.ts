import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'modules'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.string('status')
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.timestamp('removed_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
