const express = require('express')
const router = express.Router()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.post('/:id/update', async (req: any, res: any) => {
    const id = req.params.id;
    const { username, email, imgURL }: {username: string; email: string; imgURL: string;} = req.body;

    try {
        const user = await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                username: username,
                email: email,
                pfp: imgURL,
            }
        })
        return res.status(200).json(user);
    } catch (e:any) {
        console.log(e);
        return res.status(400).json({ message: 'Failed to update user' })
    }
})

module.exports = router