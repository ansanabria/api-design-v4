import { Router } from 'express'
import { body, check, oneOf } from 'express-validator'
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product'
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update'
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getOneUpdatePoint,
  getUpdatePoints,
  updateUpdatePoint,
} from './handlers/updatePoints'
import { handleErrors } from './modules/middlewares'

const router: Router = Router()

/**
 * PRODUCTS
 */

router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put(
  '/product/:id',
  [body('name').isString(), handleErrors],
  updateProduct
)
router.post('/product', [body('name').isString(), handleErrors], createProduct)
router.delete('/product/:id', deleteProduct)

/**
 * UPDATE
 */

router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put(
  '/update/:id',
  [
    body('title').optional(),
    body('body').optional(),
    oneOf([
      check('status').equals('IN_PROGRESS').optional(),
      check('status').equals('SHIPPED').optional(),
      check('status').equals('DEPRECATED').optional(),
    ]),
    body('version').optional(),
    handleErrors,
  ],
  updateUpdate
)
router.post(
  '/update',
  [
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('productId').exists().isString(),
    handleErrors,
  ],
  createUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * UPDATE POINTS
 */

router.get('/updatepoint', getUpdatePoints)
router.get('/updatepoint/:id', getOneUpdatePoint)
router.put(
  '/updatepoint/:id',
  [
    body('name').optional().isString(),
    body('description').optional().isString(),
    handleErrors,
  ],
  updateUpdatePoint
)
router.post(
  '/updatepoint',
  [
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    handleErrors,
  ],
  createUpdatePoint
)
router.delete('/updatepoint/:id', deleteUpdatePoint)

export default router
