import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
  if (req.method === 'GET') {
    try {
       const quizzes = await prisma.quiz.findMany({
        include: {
          questions: true,
        }
       });
      res.status(201).json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve quiz' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}