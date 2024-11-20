import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import Enrolment from '#models/enrolment'

@inject()
export class EnrolmentService {
  constructor(private ctx: HttpContext) {}

  async list() {
    try {
      const enrolmentQuery = Enrolment.query()
      enrolmentQuery.where('enrolments.user_id', this.ctx.auth?.user?.id)
      enrolmentQuery.where('enrolments.status', 'active')
      enrolmentQuery.preload('course')
      const enrolment = await enrolmentQuery
      return enrolment
    } catch (error) {
      return error
    }
  }

  async findById(id: any) {
    try {
      const enrolmentQuery = Enrolment.query()
      enrolmentQuery.where('enrolments.id', id)
      enrolmentQuery.where('enrolments.user_id', this.ctx.auth?.user?.id)
      enrolmentQuery.where('enrolments.status', 'active')
      enrolmentQuery.preload('course', (courseQuery) => {
        courseQuery.preload('modules', (moduleQuery) => {
          moduleQuery.where('modules.status', 'active')
          moduleQuery.preload('materials', (materialQuery) => {
            materialQuery.where('materials.status', 'active')
          })
        })
      })
      const enrolment = await enrolmentQuery.firstOrFail()
      return enrolment
    } catch (error) {
      return error
    }
  }
}
