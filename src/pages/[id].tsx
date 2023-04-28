import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getQuiz } from "./api/quiz/getQuiz";
import QuizCard from "@/components/QuizCard";
import { AiOutlineHome } from "react-icons/ai";

interface Question {
  id: number;
  questionText: string;
  answer: string;
}

interface Quiz {
  id: number;
  name: string;
  createdAt: string;
  questions: Question[];
}

const play = ({ quiz }: { quiz: Quiz }) => {
  return (
    <>
      <Head>
        <title>Quiz</title>
      </Head>

      <div className="bg-gradient-to-l from-[#667eea] to-[#764ba2] text-white  text-6xl">
        <div
          className=" 
                    min-h-screen flex flex-col  justify-center items-center 
                    md:flex-row md:items-bassline md:justify-between"
        >
          <div className="justify-center flex flex-col items-center">
            <h1 className="m-10 font-bold text-6xl tracking-tighter">
              {quiz.name} Quiz
            </h1>
            <Link href="/">
              <button
                type="button"
                className="  p-2 text-white border border-gray-800 rounded-lg bg-gray-800  hover:bg-gray-700
               text-2xl hover:scale-110 duration-300"
              >
                <AiOutlineHome />
              </button>
            </Link>
          </div>

          <div className="p-8 grow ">
            <div
              className="flex flex-col justify-center items-center 
                           text-3xl"
            >
              {quiz.questions.map((question) => (
                <QuizCard key={question.id} question={question} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default play;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    const quiz = await getQuiz(id);

    return {
      props: { quiz },
      revalidate: 60,
    };
  } catch (error) {
    console.error(error);
    return { props: { quiz: [] } };
  }
}
