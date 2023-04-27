import { ChangeEvent, FormEvent, useState } from 'react';
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import {AiOutlineHome} from 'react-icons/ai'

export default function create() {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { text: "", answer: false },
    { text: "", answer: false },
    { text: "", answer: false },
  ]);
  const router = useRouter();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuizTitle(e.target.value);
  };

  const handleQuestionTextChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const newQuestions = [...questions];
    newQuestions[i].text = e.target.value;
    setQuestions(newQuestions);
  };

  const handleQuestionAnswerChange = (i: number) => {
    const newQuestions = [...questions];
    newQuestions[i].answer = !newQuestions[i].answer;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    //prisma client can't be in browser so send with POST
   // createQuiz(quizTitle, questions)

    try {
      console.log(questions);
      const response = await fetch("/api/quiz/createQuiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: quizTitle,
          questions: [
            {
              questionText: questions[0].text,
              answer: questions[0].answer,
            },
            {
              questionText: questions[1].text,
              answer: questions[1].answer,
            },
            {
              questionText: questions[2].text,
              answer: questions[2].answer,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gradient-to-l from-[#667eea] to-[#764ba2] text-white ">
   
      <Head>
        <title>Create Quiz</title>
      </Head>
      <div className=" 
  min-h-screen flex flex-col justify-center items-center 
    lg:flex-row lg:items-bassline lg:justify-between">

<div className="justify-center flex flex-col items-center">
<h1 className="m-10 font-bold text-6xl tracking-tighter">
          Create a New Quiz
        </h1>
        <Link href="/" >
        <button
          type="button"
          className="mb-4  p-2 text-gray-600 border border-gray-400 rounded-lg bg-gray-300  hover:bg-gray-200
          text-2xl hover:scale-110 duration-300">
         <AiOutlineHome/>
        </button>
      </Link>
</div>

  <form
        onSubmit={handleSubmit}
        className=" w-auto min-w-[80%] max-w-[80%] mx-auto space-y-6 flex flex-col items-stretch sm:p-3 lg:p-10 "
      >
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={handleTitleChange}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
               focus:ring-blue-500 focus:border-blue-500
              "
        />

        {questions.map((question, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={question.text}
              onChange={(event) => handleQuestionTextChange(event, index)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
               focus:ring-blue-500 focus:border-blue-500
             "
            />

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={question.answer}
                  onChange={() => handleQuestionAnswerChange(index)}
                  className="sr-only peer"
                />

                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-white">
                  {question.answer ? "True" : "False"}
                </span>
              </label>
            </div>
          </div>
        ))}

        
        <button
          type="submit"
          className=" w-20 
               text-gray-400 border border-gray-300 rounded-lg bg-gray-50  hover:bg-gray-200 
              text-xl p-2
               hover:scale-105 duration-300">
          Submit
        </button>
      </form>


</div>
    
    </div>
  );
}

