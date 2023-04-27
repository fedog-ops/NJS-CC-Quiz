import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      const { name, questions } = req.body;
      console.log(req.body)
      const quiz = await prisma.quiz.create({
        data: {
          name: name,
          questions: {
            create: questions.map((question: { questionText: String; answer: String; })=> ({
                questionText: question.questionText,
                answer: question.answer
            })),
          },
        },
        include: {
          questions: true,
        },
      });
      res.status(201).json(quiz);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create quiz' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}