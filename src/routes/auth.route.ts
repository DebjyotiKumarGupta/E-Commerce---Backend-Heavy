import {Router} from 'express'
import { signUp, logIn } from '../controllers/auth.controller';

const authRoutes:Router = Router();

authRoutes.post('/signUp',signUp  )
authRoutes.post('/logIn',logIn  )


export default authRoutes;