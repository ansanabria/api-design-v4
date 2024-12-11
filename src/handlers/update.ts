import prisma from '../db'

export const getOneUpdate = async (req, res, next) => {
  const updateId = req.params.id

  const update = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
  })

  if (!update) {
    return next({ type: 'resource', status: 400, message: 'Update not found' })
  }

  res.json({ data: update })
}

export const getUpdates = async (req, res, next) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      update: true,
    },
  })

  if (!products) {
    return next({
      type: 'resource',
      status: 400,
      message: 'This user has no products',
    })
  }

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.update]
  }, [])
  res.json({ data: updates })
}

export const createUpdate = async (req, res, next) => {
  try {
    await prisma.product.findFirstOrThrow({
      where: {
        id: req.body.productId,
      },
    })
  } catch (err) {
    return next({
      type: 'resource',
      status: 400,
      message: 'Posting update to non-existant product',
    })
  }

  let update
  try {
    update = await prisma.update.create({
      data: req.body,
    })
  } catch (err) {
    return next({
      type: 'resource',
      status: 400,
      message: 'Update could not be created',
    })
  }

  res.json({ data: update })
}

export const updateUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
      update: {
        some: {
          id: req.params.id,
        },
      },
    },
  })

  if (!product) {
    res.status(400)
    return res.json({ error: 'Update not found' })
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  })

  res.json({ data: updatedUpdate })
}

export const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsToId: req.user.id,
      update: {
        some: req.params.id,
      },
    },
  })

  if (!product) {
    res.status(400)
    return res.json({ error: 'Update not found' })
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  })

  res.json({ data: deletedUpdate })
}
