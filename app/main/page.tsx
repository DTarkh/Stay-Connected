import React from "react";
import Navbar from "../Components/Navbar";
import Question from "../Components/Question";

const data = [
  {
  title: "React Fetching",
  author: "dtark",
  question: "What is the best way to fetch data in React? I have heard about React Query. Is it true?",
  tags: ["react", "frontend", "fetching"],
  date: Date.now(),
},
{
  title: "React Fetching",
  author: "dtark",
  question: "What is the best way to fetch data in React? I have heard about React Query. Is it true?",
  tags: ["react", "frontend", "fetching"],
  date: Date.now(),
},
{
  title: "React Fetching",
  author: "dtark",
  question: "What is the best way to fetch data in React? I have heard about React Query. Is it true?",
  tags: ["react", "frontend", "fetching"],
  date: Date.now(),
},
{
  title: "React Fetching",
  author: "dtark",
  question: "What is the best way to fetch data in React? I have heard about React Query. Is it true?",
  tags: ["react", "frontend", "fetching"],
  date: Date.now(),
}
]





const Main = () => {
  return (
    <>
      <Navbar />
      <main className="flex w-full justify-center gap-5">
        <div className="flex flex-col items-center gap-4 mt-4">
          <Question data={data} />
        </div>
        <div className="border-2 border-current max-lg:hidden w-[400px] h-[90vh] mt-4 rounded-xl flex flex-col items-center p-4">
          <h2>Rating</h2>
          <div></div>
        </div>
      </main>
    </>
  );
};

export default Main;

