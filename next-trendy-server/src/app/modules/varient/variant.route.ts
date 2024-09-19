import express from 'express';

import validateRequest from '../../middlewares/validateRequest';

import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { variantValidations } from './variant.validation';
import { VariantControllers } from './variant.controller';

const router = express.Router();

router.post(
  '/create-variant',

  validateRequest(variantValidations.createVariantValidationSchema),
  VariantControllers.createVariant,
);

router.get(
  '/',
  // auth(USER_ROLE.superAdmin),
  VariantControllers.getAllVariants,
);
router.put('/update-variant/:id', VariantControllers.updateVariant);
router.delete('/delete-variant/:id', VariantControllers.deleteVariant);

export const variantRoutes = router;
