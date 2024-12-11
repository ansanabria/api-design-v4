import prisma from '../db'

export const getProducts = async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  })

  if (!user) {
    return next({ type: 'auth' })
  }

  res.json({ data: user.products })
}

export const getOneProduct = async (req, res, next) => {
  const id = req.params.id

  const product = await prisma.product.findFirst({
    where: {
      id,
      belongsToId: req.user.id,
    },
  })

  if (!product) {
    return next({
      type: 'resource',
      status: 400,
      message: 'The user does not have products',
    })
  }

  res.json({ data: product })
}

export const createProduct = async (req, res, next) => {
  let product
  try {
    product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    })
  } catch (err) {
    return next({
      type: 'resource',
      status: 400,
      message: 'Product cannot be created',
    })
  }

  res.json({ data: product })
}

export const updateProduct = async (req, res, next) => {
  let updated
  try {
    updated = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
      },
    })
  } catch (err) {
    return next({
      type: 'resource',
      status: 400,
      message: 'Product cannot be updated',
    })
  }

  res.json({ data: updated })
}

export const deleteProduct = async (req, res, next) => {
  let deletedProduct
  try {
    deletedProduct = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    })
  } catch (err) {
    return next({
      type: 'resource',
      status: 400,
      message: 'Product cannot be deleted',
    })
  }

  res.json({ data: deletedProduct })
}
