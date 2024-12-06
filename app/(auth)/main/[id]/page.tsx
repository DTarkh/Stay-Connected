import React from "react";
import { fetchQuestion } from "@/app/Components/forDetailed/fetchQuestion";
import ErrorPage from "@/app/Components/forDetailed/ErrorPage";
import QuestionDetails from "@/app/Components/forDetailed/QuestionDetails";
import AnswerList from "@/app/Components/forDetailed/AnswerList";

const QuestionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const question = await fetchQuestion(id);

    if (!question) {
      return (
        <ErrorPage
          title="Page Not Found"
          message={`Sorry, the question with ID ${id} does not exist.`}
        />
      );
    }

    return (
      <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4 mx-12">
        <QuestionDetails question={question} />
        <AnswerList answers={question.answers} />
      </main>
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return (
      <ErrorPage
        title="Error"
        message="Sorry, something went wrong while fetching the data."
      />
    );
  }
};

export default QuestionDetailPage;
