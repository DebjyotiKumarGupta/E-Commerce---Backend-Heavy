import {NextFunction, Request , Response } from 'express';
import { prismaClient } from '..';
import {hashSync, compareSync} from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';
import { BadRequestException } from '../exceptions/bad_request';
import { ErrorCode } from '../exceptions/root';


export const signUp = async (req: Request, res: Response, next:NextFunction): Promise<any>  => {
    // res.status(200).json({"success" :true});
    const {email , password , name } = req.body;
    try{
        let user = await prismaClient.user.findFirst({where:{email}})

        if(user){
            // throw Error('User already exist')
            // console.log("hellow");
            return next(new BadRequestException("User does not exists" , ErrorCode.USER_ALREADY_EXISTS));

            // return res.status(404).json({"Error":"User Already Exists"});
        }

        user = await prismaClient.user.create({
            data:{
                name , email , password: hashSync(password, 10), 
            }
        })

        return res.status(200).json({"success":true , "user" :user})
    }catch(err){
        console.log(err);
        return res.status(500).json({"error" :"Internal Server Error"});
    }

}

export const logIn = async (req: Request, res: Response, next:NextFunction): Promise<any>  => {
    // res.status(200).json({"success" :true});
    const {email , password } = req.body;
    try{
        let user = await prismaClient.user.findFirst({where:{email}})

        if(!user){
            // throw Error('User already exist')
            return next(new BadRequestException("User does not exists" , ErrorCode.USER_ALREADY_EXISTS));
            // return res.status(404).json({"Error":"User does not exists"});
        }

        if(!compareSync(password, user.password)){
            // throw Error('Password Incorrect')
            return next(new BadRequestException("Password Incorrect" , ErrorCode.INCORRECT_PASSWORD));

        }

        const token = jwt.sign({
            userId :user.id, 
        }, JWT_SECRET)
        return res.status(200).json({"success":true , "user" :user, "token" :token})

    }catch(err){
        console.log(err);
        return res.status(500).json({"error" :"Internal Server Error"});
    }

}