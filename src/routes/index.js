import AuthRouter from './auth.router.js';
import RoleRoutes from './role.router.js';
import UserRoutes from './user.routers.js';
import analyticRoutes from './analytic.routes.js';
import categoryRoutes from './category.routes.js';
import express from 'express';
import orderRoutes from './order.routes.js';
import productRoutes from './product.routes.js';
import sizeRoutes from './size.routes.js';
import toppingRoutes from './topping.routes.js';
import uploadBanner from './banner.routes.js';
import uploadRouter from './uploadfiles.routes.js';
import userRoutes from './auth.routes.js';
import voucherRoutes from './voucher.routes.js';
import cartRouter from './cart.routes.js';
import newBlogRouter from './newsBlogs.routes.js';

const router = express.Router();

const rootRoutes = [
  categoryRoutes,
  UserRoutes,
  AuthRouter,
  userRoutes,
  sizeRoutes,
  toppingRoutes,
  productRoutes,
  uploadRouter,
  RoleRoutes,
  voucherRoutes,
  orderRoutes,
  uploadBanner,
  analyticRoutes,
  cartRouter,
  newBlogRouter,
];

rootRoutes.map((route) => {
  router.use(route);
});

export default rootRoutes;
