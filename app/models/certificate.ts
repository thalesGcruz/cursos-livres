import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Certificate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare enrolmentId: number

  @column()
  declare fullName: string

  @column()
  declare code: string

  @column()
  declare document: string

  @column()
  declare status: string

  @column()
  declare duration: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
