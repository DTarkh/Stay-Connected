import React from "react";
import Navbar from "../Components/Navbar";
import Questions from "../Components/Question";
import { QuestionData } from "../Components/Question";

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
              <Questions key={item.id} item={item} /> 
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
