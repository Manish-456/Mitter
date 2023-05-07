import { NextApiRequest, NextApiResponse } from "next";
import prisma from '@/libs/prismadb'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "GET") {
        return res.status(405).end();
    }
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            },

        })
        // Remove the password field from each user object
        const sanitizedUsers = users.map((user) => {
            const { password, ...sanitizedUser } = user;
            return sanitizedUser;
        });
        return res.status(200).json(sanitizedUsers)
    } catch (error) {
        return res.status(500).json({ msg: "Internal server error" })

    }
}