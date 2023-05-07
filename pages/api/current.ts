import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res:NextApiResponse){
    if(req.method !== "GET"){
        return res.status(405).end();
    }
    try {
        const {currentUser} = await serverAuth(req, res);
        const {password, ...current} = currentUser;
        return res.status(200).json({...current})
    } catch (error) {
        return res.status(400).end();
    }
}