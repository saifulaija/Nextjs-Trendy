import { Router } from 'express';

import { AuthRoutes } from '../modules/Auth/auth.route';

import { UserRoutes } from '../modules/User/user.route';
import { ProductsRoutes } from '../modules/products/product.route';
import { orderRoute } from '../modules/order/order.route';
import { reviewRoutes } from '../modules/review/review.route';
import { chartRoutes } from '../modules/chartData/chart.route';
import { variantRoutes } from '../modules/varient/variant.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },

  {
    path: '/auth',
    route: AuthRoutes,
  },

  {
    path: '/product',
    route: ProductsRoutes,
  },
  {
    path: '/orders',
    route: orderRoute,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/chart',
    route: chartRoutes,
  },
  {
    path: '/variant',
    route: variantRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
