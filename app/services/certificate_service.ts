import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import Enrolment from '#models/enrolment'
import Certificate from '#models/certificate'

@inject()
export default class CertificateService {
  constructor(private ctx: HttpContext) {}
  async store(data: any) {
    try {
      const { enrolmentId } = data
      const enrolmentQuery = Enrolment.query()
      enrolmentQuery.where('enrolments.id', enrolmentId)
      enrolmentQuery.where('enrolments.status', 'active')
      enrolmentQuery.where('enrolments.user_id', this.ctx.auth?.user?.id)
      enrolmentQuery.preload('course')
      enrolmentQuery.preload('user')
      const enrolment = await enrolmentQuery.first()

      const certificate = await Certificate.firstOrCreate(
        { enrolmentId: enrolmentId },
        {
          enrolmentId: enrolmentId,
          document: enrolment?.user.document,
          fullName: enrolment?.user.fullName,
          duration: enrolment?.course.totalDuration,
          status: 'active',
          code:
            'D' +
            enrolment?.user.document.substring(6, 11) +
            'E' +
            enrolmentId +
            '-C' +
            enrolment?.course.id,
        }
      )

      return certificate
    } catch (error) {
      console.log(error)
    }
  }
}
