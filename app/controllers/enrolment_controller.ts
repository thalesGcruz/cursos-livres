import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { EnrolmentService } from '#services/enrolment_service'

@inject()
export default class EnrolmentController {
  constructor(private enrolment: EnrolmentService) {}

  async list({ response }: HttpContext) {
    try {
      const enrolments = await this.enrolment.list()
      return response.send(enrolments)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }

  async info({ response, request }: HttpContext) {
    try {
      const id = request.param('id')
      const enrolment = await this.enrolment.findById(id)
      return response.send(enrolment)
    } catch (error) {
      response.status(error.status).send(error)
    }
  }
}
