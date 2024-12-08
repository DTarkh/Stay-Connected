import React from "react";
import { cookies } from "next/headers";
import { fetchQuestion } from "@/app/Components/forDetailed/fetchQuestion";
import ErrorPage from "@/app/Components/forDetailed/ErrorPage";
import QuestionDetails from "@/app/Components/forDetailed/QuestionDetails";
import AnswerList from "@/app/Components/forDetailed/AnswerList";
import AddAnswerForm from "@/app/Components/forDetailed/AddAnswerForm";

interface Answer {
  id: number;
  user: string;
  body: string;
  created_at: string;
  like_count: number;
  dislike_count: number;
}

interface Question {
  id: number;
  user: string;
  subject: string;
  body: string;
  tag_details: { name: string }[];
  like_count: number;
  dislike_count: number;
  created_at: string;
  answers: Answer[];
  number_of_answers: number;
}

interface Props {
  params: { id: string };
}

const QuestionDetailPage = async ({ params }: Props) => {
  const { id } = params;

  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";

  let question: Question | null = null;
  let error: string | null = null;

  try {

    question = await fetchQuestion(id.toString()) as Question | null;

    if (!question) {
      error = `Question with ID ${id} not found.`;
    }
  } catch (err) {
    error = "Failed to fetch question data.";
    console.error("Error fetching data:", err);
  }

  if (error) {
    return <ErrorPage title="Error" message={error} />;
  }

  if (!question) {
    return <ErrorPage title="Loading" message="Fetching question data..." />;
  }

  return (

    <main className="flex justify-center gap-5 bg-white w-full ">
      <div className="flex flex-col w-3/4 items-center pt-10">
        <h3 className="text-3xl font-semibold text-indigo-500">
          Question Details
        </h3>
        <QuestionDetails question={question} />
        <AnswerList
          answers={question.answers}
          number_of_answers={question.number_of_answers}
        />
        <AddAnswerForm
          questionId={question.id.toString()}
          accessToken={accessToken}
        />
      </div>
    </main>
  );
};

export default QuestionDetailPage;
