import Head from "next/head";
import Link from "next/link";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { useQuery } from "react-query";

interface Question {
  id: number;
  text: string;
  choices: string[];
  answer: string;
}

interface Quiz {
  id: number;
  name: string;
  createdAt: string;
  questions: Question[];
}

export default function Home() {
  const { data: quizzes = [], isLoading, isError } = useQuery<Quiz[]>(
    "quizzes",
    async () => {
      const response = await fetch("/api/quiz");
      return response.json();
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching quizzes</div>;
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-6xl">
        <div className="min-h-screen flex flex-col justify-center items-center lg:flex-row lg:items-center lg:justify-between">
          <div className="justify-center flex flex-col items-center">
            <h1 className="m-10 font-bold text-6xl tracking-tighter">Quizzlet!</h1>
            <Link href="/create">
              <button
                type="button"
                className="p-2 text-white bg-gray-800 border border-gray-800 rounded-lg hover:bg-gray-700 text-2xl hover:scale-110 duration-300"
              >
                <MdFormatListBulletedAdd />
              </button>
            </Link>
          </div>
          <div className="p-8 grow">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 m-10">
              {quizzes.map((quiz) => (
                <Link key={quiz.id} href={{ pathname: `/${quiz.id}`, query: { id: quiz.id } }}>
                  <div
                    className="m-5 w-96 block max-w-sm p-6 rounded-lg shadow bg-gray-800 border-gray-800 hover:bg-gray-800 hover:scale-110 duration-300"
                  >
                    <h5 className="text-center mb-4 text-3xl tracking-tight">{quiz.name}</h5>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
