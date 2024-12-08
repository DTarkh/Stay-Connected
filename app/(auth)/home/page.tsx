import React from "react";
import Questions, { QuestionData } from "../../Components/Question";
import Link from "next/link";
import Ratings from "../../Components/Ratings";
import { API_ROUTES } from "@/app/utils/apiClient";

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
    const response = await fetch(url, { cache: "no-store" });
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    questions = await response.json();
  } catch (err) {
    console.error("Error fetching questions:", err);
  }

  return (
    <main className="flex w-full justify-center gap-8 p-6 bg-gray-50">
      {/* Questions Section */}
      <div className="flex flex-col items-center gap-6 mt-6 w-full max-w-3xl">
        {questions.length === 0 ? (
          <p className="text-gray-600 text-lg">No questions available</p>
        ) : (
          questions.map((item: QuestionData) => (
            <div
              className="w-full bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              key={item.id}
            >
              <Link href={`/home/${item.id}`} passHref>
                <Questions item={item} />
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Ratings Section */}
      <div className="border border-gray-300 bg-white shadow-lg rounded-lg max-lg:hidden mt-6 p-6 flex flex-col items-center gap-4 overflow-auto max-h-[500px]">
        <Ratings />
      </div>
    </main>
  );
};

export default Main;
