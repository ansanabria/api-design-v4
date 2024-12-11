import { validationResult } from 'express-validator'
import { Middleware } from 'express-validator/lib/base'

export const handleErrors: Middleware = (req, res, next) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400)
    res.json({ errors: errors.array() })
  } else {
    next()
  }
}
