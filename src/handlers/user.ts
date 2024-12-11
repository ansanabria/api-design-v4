import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req, res, next) => {
  let user
  try {
    user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    })
  } catch (err) {
    err.type = 'input'
    return next(err)
  }

  const token = createJWT(user)
  res.json({ token })
}

export const signin = async (req, res, next) => {
  let user
  try {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        username: req.body.username,
      },
    })
  } catch (err) {
    err.type = 'input'
    return next(err)
  }

  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    return next({ type: 'input' })
  }

  const token = createJWT(user)
  res.json({ token })
}
