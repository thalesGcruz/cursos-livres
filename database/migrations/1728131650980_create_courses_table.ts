import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'courses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name')
      table.text('description')
      table.string('img_url')
      table.integer('amount')
      table.json('keys_words')
      table.json('seo_description')
      table.string('billing_type')
      table.json('course_program')
      table.integer('rate')
      table.integer('total_duration')
      table.string('level')
      table.string('status')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.timestamp('removed_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
