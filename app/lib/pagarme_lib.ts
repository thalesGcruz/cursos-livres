import { Client, OrdersController } from '@pagarme/pagarme-nodejs-sdk'
import env from '#start/env'

// inciando conexão com a pagarme
const client = new Client({
  basicAuthCredentials: {
    username: env.get('PAGARME_KEY'),
    password: '',
  },
})

// instanciando controler de order pagarme
export const ordersController = new OrdersController(client)
