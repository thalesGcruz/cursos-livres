import CourseService from '#services/course_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CourseController {
  constructor(private course: CourseService) {}

  async index() {}

  async list({ request, response }: HttpContext) {
    try {
      const filter = await this.course.filter(request.qs())
      response.send(filter)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }

  async show() {}

  async info() {}
}
