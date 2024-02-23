import express from 'express'
import {getUserByEmail, createUser} from "../schema/users"
import {random, authentication} from "../helpers"

export const login = async (req: express.Request, res: express.Response)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');
        if(!user){
            return {message:"Error getting email",status:res.sendStatus(400)};
        }

        const expectedHash = authentication(user.authentication.salt, password);
        
        if(user.authentication.password !== expectedHash){
            return res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString())

        await user.save();

        res.cookie("USER-AUTH",user.authentication.sessionToken, {domain: 'localhost', path:'/'} );
        return res.sendStatus(200).json(user).end();

    }catch(error){
        console.log('error', error);
        return res.sendStatus(400);
    } 
}

export const register = async (req: express.Request, res: express.Response) =>{
    try{
        const {email, password, name, role} = req.body;
        if(!email || !password || !name || !role){
            return {message:"Email, name or password is missing",status:res.sendStatus(400)};

        }

        const existingUser = await getUserByEmail(email)

        if(existingUser){
            return {message:"User Exists",status:res.sendStatus(400)};
        }

        const salt = random();
        const user = await createUser({
            email, name,role, authentication:{
                salt, password
            }
        })

        return res.status(200).json(user).end()
    } catch(error){
        console.log('error', error);
        return {message:"Overall error",status:res.sendStatus(400), error: error};

    }
}