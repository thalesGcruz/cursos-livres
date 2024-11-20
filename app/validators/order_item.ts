import vine from '@vinejs/vine'

export const createOrderItemValidator = vine.compile(
  vine.object({
    courseId: vine.number(),
    quantity: vine.number().optional(),
  })
)
