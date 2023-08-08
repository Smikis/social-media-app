const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

router.post('/register', async (req: any, res: any) => {
    const { email, password, username, tag: handle }: {email: string; password: string; username: string; tag: string} = req.body;
    
    const tag = handle[0] === '@' ? handle : `@${handle}`
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await prisma.user.findMany({
        where: {
          OR: [
            {
              email: email,
              tag: tag
            }
          ]

        }
      })
    
      if (user.length > 0) return res.status(400).json({ message: 'User already exists' });
      else {
        const newUser = await prisma.user.create({
          data: {
            email: email,
            passwordHash: hashedPassword,
            username: tag, // TEMPORARY, FIX LATER
            tag: tag
          }
        })
        return res.status(201).json(newUser);
        }
      } catch (e:any) {
        console.log(e);
        return res.status(400).json({ message: 'Failed to create new user' })
      }
  })
  
router.post('/login', async (req: any, res: any) => {
  const { email, password }: {email: string; password: string} = req.body;  
  
  console.log(req.body);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email
      }
    })
    if (!user) return res.status(400).json({ message: 'This user does not exist' });
  
    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (validPassword){
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (e: any){
    console.log(e);
    return res.status(400).json({ message: 'Something went wrong...' });
  }


})

module.exports = router;