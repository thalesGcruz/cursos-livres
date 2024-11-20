import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    full_name: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
    phone: vine.string().optional(),
    document: vine.string().optional(),
    gender: vine.string().optional(),
    email_verify: vine.boolean().optional(),
  })
)

export const updateUserValidator = vine.compile(vine.object({}))
