import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb'

export default async function handler(
    req: NextApiRequest,
     res: NextApiResponse){
   if(req.method !== 'POST') {
    res.status(405).end();
   }
   try {
     const {email , username, name, password} = req.body;

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     const user = await prisma.user.create({
        data : {
            username,
            email,
            name,
           password : hashedPassword
        }
     })
     res.status(201).json(user)
   } catch (error) {

    return res.status(500).json({message : "Internal Server error"})
   }
}