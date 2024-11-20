import { inject } from '@adonisjs/core'
import Course from '#models/course'
// import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CourseService {
  constructor() {}

  async filter(filter: any) {
    try {
      const { sort = 'desc', limit = 30, page = 1, name = null, level = null } = filter
      const query = Course.query()
      name && query.where('name', 'LIKE', `%${name}%`)
      level && query.where('level', level)
      query.orderBy('id', sort)
      // carregando modulos dos cursos
      query.preload('modules', (modulesQuery) => {
        // carregando materiais dos modulos
        modulesQuery.where({ status: 'active' }).preload('materials', (materialsQuery) => {
          materialsQuery.where({ status: 'active' })
        })
      })
      // obtendo resultados paginados
      const courses = await query.paginate(page, limit)
      return courses.serialize({
        relations: {
          modules: {
            relations: {
              materials: {
                fields: ['name', 'duration', 'type', 'description'],
              },
            },
          },
        },
      })
    } catch (error) {
      return error
    }
  }

  async findById(id: any) {
    try {
      const course = await Course.findBy('id', id)
      return course
    } catch (error) {
      return error
    }
  }
}
