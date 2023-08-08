const express = require('express')
const router = express.Router()

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.post('/add', async (req: any, res: any) => {
    const { userId, imageURL, description } = req.body;

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                posts: {
                    create: {
                        imageLink: imageURL,
                        description: description,
                    }
                }
            },
        })
        
        return res.status(201).json({ message: 'Post created successfully' });
    } catch (e:any) {
        console.log(e);
        return res.status(400).json({ message: 'Failed to create new post' })
    }
})

router.get('/get/:userid', async (req: any, res: any) => {
    const { userid } = req.params;

    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userid
            },
            orderBy:{
                createdAt: 'desc'
            },
        })

        return res.status(200).json({ posts: posts });
    } catch (e:any) {
        console.log(e);
        return res.status(400).json({ message: 'Failed to get posts' })
    }
})

module.exports = router;