import express, {Express , Request , Response} from 'express'
import { PORT } from './secrets';
import rootRouter from './routes/index.routes';
import {PrismaClient} from '@prisma/client'
import { errorMiddleWare } from './middlewares/errors';
// import { log } from 'console';
const app:Express = express()

app.use(express.json());

app.use('/api/v1', rootRouter);


export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(errorMiddleWare);

app.listen(PORT, ()=> (console.log("server running")));
// connection String 
// postgresql://karanguptadev123:JcLq4H7jtGsD@ep-small-king-a5i96tlh.us-east-2.aws.neon.tech/learningDb?sslmode=require