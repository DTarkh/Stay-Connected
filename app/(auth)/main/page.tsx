import React from "react";
import Questions, { QuestionData } from "../../Components/Question";
import Link from "next/link";

interface Props {
  searchParams: { search?: string };
}

const Main = async ({ searchParams }: Props) => {
  const search = searchParams.search || ""; 

  const url = `https://nunu29.pythonanywhere.com/questions/${search ? `?search=${search}` : ""}`;

  let questions: QuestionData[] = [];
  try {
    const response = await fetch(url, { cache: "no-store" }); 
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    questions = await response.json();
  } catch (err) {
    console.error("Error fetching questions:", err);
  }

  return (
    <main className="flex w-full justify-center gap-5">
      <div className="flex flex-col items-center gap-4 mt-4">
        {questions.length === 0 ? (
          <p>No questions available</p>
        ) : (
          questions.map((item: QuestionData) => (
            <div className="w-full" key={item.id}>
              <Link href={`/main/${item.id}`} passHref>
                <Questions item={item} />
              </Link>
            </div>
          ))
        )}
      </div>
      <div className="border-2 border-current max-lg:hidden w-[400px] h-[90vh] mt-4 rounded-xl flex flex-col items-center p-4">
        <h2 className="text-lg font-semibold">Rating</h2>
        <div className="mt-4"></div>
      </div>
    </main>
  );
};

export default Main;
