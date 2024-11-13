import {Router} from 'express';
import authRoutes from './auth.route';

const rootRouter = Router();

rootRouter.use('/auth', authRoutes)

export default rootRouter;