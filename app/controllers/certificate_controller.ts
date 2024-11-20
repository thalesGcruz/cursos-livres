import CertificateService from '#services/certificate_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class CertificateController {
  constructor(private certificate: CertificateService) {}

  async store({ response }: HttpContext) {
    try {
      const certificate = await this.certificate.store({ enrolmentId: 1 })
      return response.send(certificate)
    } catch (error) {
      return response.status(error.status).send(error)
    }
  }
}
