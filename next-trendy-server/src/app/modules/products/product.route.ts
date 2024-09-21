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
  '/update-product/:id',
  // auth(USER_ROLE.superAdmin),
  
  ProductControllers.updateProduct,
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
router.get('/:productId/review', reviewControllers.getAllReviews)
router.get('/pending-reviews', reviewControllers.getAllPendingReviews)
router.get('/approved-reviews', reviewControllers.getAllApprovedReviews)
router.delete('/delete-product/:id',ProductControllers.deleteProduct)
router.get('/new-arrival-products',ProductControllers.getNewArrivalProducts)

export const ProductsRoutes = router;
