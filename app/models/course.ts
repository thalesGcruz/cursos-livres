import { DateTime } from 'luxon'
import { column, BaseModel, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Module from '#models/module'

export default class Course extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare type: string

  @column()
  declare imgUrl: string

  @column()
  declare courseProgram: object

  @column()
  declare level: string

  @column()
  declare amount: number

  @column()
  declare totalDuration: number

  @column()
  declare status: string

  @column()
  declare rate: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Module)
  declare modules: HasMany<typeof Module>
}
