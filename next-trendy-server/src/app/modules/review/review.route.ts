import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { reviewValidations } from './review.validation';
import { reviewControllers } from './review.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-review',

  validateRequest(reviewValidations.CreateReviewValidationSchema),
  reviewControllers.createReview,
);

router.put(
  '/:id',
  // auth(USER_ROLE.superAdmin),
  reviewControllers.updateReview,
);



export const reviewRoutes = router;
