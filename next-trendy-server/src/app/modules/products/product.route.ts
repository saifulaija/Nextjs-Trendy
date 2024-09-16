import { Review } from './../review/review.model';
import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { reviewControllers } from '../review/review.controller';

const router = express.Router();

router.post(
  '/create-product',
  // auth(USER_ROLE.superAdmin),
  // validateRequest(ProductValidations.CreateProductValidationSchema),
  ProductControllers.createProduct,
);

router.patch(
  '/delete-product/:id',
  auth(USER_ROLE.superAdmin),
  
  ProductControllers.deleteProduct,
);


router.get(
  '/get-single-product/:id',

  ProductControllers.getSingleProduct,
);

router.get(
  '/',

  ProductControllers.getAllProducts,
);
router.get(
  '/variant',

  ProductControllers.getAllProductsForVariant,
);

router.get(
  '/category/:category',

  ProductControllers.getAllProductsByCategory,
);

router.post('/:productId/review', reviewControllers.createReview)

export const ProductsRoutes = router;
