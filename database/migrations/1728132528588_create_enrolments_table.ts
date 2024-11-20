import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enrolments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('course_id').unsigned().references('id').inTable('courses')
      table.dateTime('start_at')
      table.dateTime('finish_at')
      table.string('status')
      table.integer('progress')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('removed_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
