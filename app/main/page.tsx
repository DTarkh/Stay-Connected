import React from "react";
import Navbar from "../Components/Navbar";

interface QuestionData {
  id: number;
  user: string;
  subject: string;
  body: string;
  tags: string[];
  number_of_answers: number;
  created_at: string; 
}

const Main = async () => {
  const questions = await fetch('https://nunu29.pythonanywhere.com/questions/')
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error:", err);
      return [];
    });

  return (
    <>
      <Navbar />
      <main className="flex w-full justify-center gap-5 bg-blue-400">
        <div className="flex flex-col items-center gap-4 mt-4">
          {questions.length === 0 ? (
            <p>No questions available</p>
          ) : (
            questions.map((item: QuestionData) => (
              <div
                key={item.id}
                className="border-2 border-gray-300 p-4 rounded-xl w-full max-w-3xl"
              >
                <h3 className="text-xl font-semibold text-blue-600">{item.subject}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <strong>Author:</strong> {item.user}
                </p>
                <p className="text-sm text-gray-800 mt-2">{item.body}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {item.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <strong>Date:</strong> {item.created_at} 
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  <strong>Answers:</strong> {item.number_of_answers}
                </p>
              </div>
            ))
          )}
        </div>

        <div className="border-2 border-current max-lg:hidden w-[400px] h-[90vh] mt-4 rounded-xl flex flex-col items-center p-4">
          <h2 className="text-lg font-semibold">Rating</h2>
          <div className="mt-4"></div>
        </div>
      </main>
    </>
  );
};

export default Main;
