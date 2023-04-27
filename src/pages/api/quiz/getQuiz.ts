import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getQuiz(stringId: string) {
const id = parseInt(stringId)
    const quiz = await prisma.quiz.findUnique({
        where: {id: id},
        include: {questions: true}
    })
    return {
        ...quiz,
        createdAt: quiz.createdAt.toISOString(),
      };
}