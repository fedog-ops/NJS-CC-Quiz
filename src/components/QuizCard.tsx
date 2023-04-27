import { useState } from "react";
import {FcCheckmark, FcCancel, FcOk} from 'react-icons/fc'

interface Question {
  id: number;
  questionText: string;
  choices: string[];
  answer: string;
}

const QuizCard = ({ question } : {question:Question}) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
  };
  const answerCSS = (question.answer ? 'hi ': 'no')
  return (
    <>
      <div>
        <div className=" place-items-center grid m-5" onClick={handleClick}>
          <div className=" 
            content-center w-192 block  p-6 rounded-lg shadow border
            bg-gray-800  border-gray-700 hover:bg-gray-700
           hover:scale-110">
            <div className="m-5 text-white md:text-3xl lg:text-4xl">
              <h2 className="mb-2">{question.questionText}</h2>
              {!isClicked ? (
                <p>...</p>
              ) : question.answer ? (
                <div className="flex items-center justify-center"> <p className="mr-4">True</p><FcOk/></div>
              ) : (
                <div className="flex items-center justify-center"> <p className="mr-4">False</p><FcCancel/></div>
               
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizCard;
