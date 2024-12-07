import React from "react";
import Questions, { QuestionData } from "../../Components/Question";
import Link from "next/link";
import Ratings from "../../Components/Ratings";
import { apiFetcher, API_ROUTES } from "@/app/utils/apiClient";  

interface Props {
  searchParams: { search?: string; tag?: string };
}

const Main = async ({ searchParams }: Props) => {
  const search = searchParams.search || "";
  const tag = searchParams.tag || "";
  let url = API_ROUTES.submitAnswer; 
  const queryParams: string[] = [];

  if (search) queryParams.push(`search=${search}`);
  if (tag) queryParams.push(`tags=${tag}`);
  if (queryParams.length > 0) {
    url += `?${queryParams.join("&")}`;  
  }
  console.log("Fetching from URL:", url);

  let questions: QuestionData[] = [];
  try {
    questions = await apiFetcher<QuestionData[]>("submitAnswer", { 
      method: "GET", 
    });
    console.log("Fetched questions:", questions);
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
      <div className="border-2 border-current max-lg:hidden mt-4 rounded-xl flex flex-col items-center p-4 overflow-auto">
        <Ratings />
      </div>
    </main>
  );
};

export default Main;
