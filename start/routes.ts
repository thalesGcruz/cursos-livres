import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const SessionController = () => import('#controllers/session_controller')
const CourseController = () => import('#controllers/course_controller')
const AccountController = () => import('#controllers/account_controller')
const OrderController = () => import('#controllers/order_controller')
const OrderItemController = () => import('#controllers/order_item_controller')
const CouponController = () => import('#controllers/coupon_controller')
const PaymentController = () => import('#controllers/payment_controller')
const EnrolmentController = () => import('#controllers/enrolment_controller')
const CertificateController = () => import('#controllers/certificate_controller')

router.on('/').renderInertia('home')

router
  .group(() => {
    router.post('/register', [SessionController, 'register']).use(middleware.guest())
    router.get('/login', [SessionController, 'loginPage']).use(middleware.guest())
    router.post('/login', [SessionController, 'login']).use(middleware.guest())
    router.post('/logout', [SessionController, 'logout']).use(middleware.auth())
  })
  .prefix('/auth')

router
  .group(() => {
    router.get('/', [CourseController, 'index'])
    router.get('/list', [CourseController, 'list'])
    router.get('/show/:id', [CourseController, 'show'])
    router.get('/info/:id', [CourseController, 'info'])
  })
  .prefix('courses')

router
  .group(() => {
    router.get('show', [AccountController, 'show'])
    router.get('info', [AccountController, 'info'])
    router.get('edit/:id', [AccountController, 'edit'])
    router.get('update/:id', [AccountController, 'update'])
  })
  .prefix('account')
  .use(middleware.auth())

// rotas das matriculas
router
  .group(() => {
    router.get('/', [EnrolmentController, 'list'])
    router.get('/info/:id', [EnrolmentController, 'info'])
  })
  .prefix('enrolment')
  .use(middleware.auth())

router
  .group(() => {
    router.get('show', [OrderController, 'show'])
    router.get('info', [OrderController, 'info'])
    router
      .group(() => {
        router.post('/', [OrderItemController, 'store'])
        router.delete('/:id', [OrderItemController, 'delete'])
      })
      .prefix('item')

    router
      .group(() => {
        router.post('/', [CouponController, 'store'])
        router.delete('/:code', [CouponController, 'delete'])
      })
      .prefix('coupon')

    router
      .group(() => {
        router.post('pix', [PaymentController, 'pix'])
        router.post('credit-card', [PaymentController, 'creditCard'])
      })
      .prefix('payment')
  })
  .prefix('order')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/', [CertificateController, 'store'])
  })
  .prefix('certificate')
  .use(middleware.auth())
