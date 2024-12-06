import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"; 
interface TagDetail {
  name: string;
}

interface Answer {
  user: string;
  body: string;
  id: number;
  like_count: number;
  dislike_count: number;
  created_at: string;
}

interface Question {
  id: number;
  user: string;
  subject: string;
  body: string;
  tag_details: TagDetail[];
  like_count: number;
  dislike_count: number;
  number_of_answers: number;
  created_at: string;
  answers: Answer[];
}

async function fetchQuestion(id: string): Promise<Question | null> {
  const res = await fetch(`https://nunu29.pythonanywhere.com/questions/${id}/`);

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

const QuestionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  try {
    const question = await fetchQuestion(id);

    if (!question) {
      return (
        <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-2xl font-semibold">Page Not Found</h1>
            <p className="text-lg">Sorry, the question with ID {id} does not exist.</p>
          </div>
        </main>
      );
    }

    const tagDetails = Array.isArray(question.tag_details) ? question.tag_details : [];
    const answers = Array.isArray(question.answers) ? question.answers : [];

    return (
      <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-2xl font-semibold">{question.subject}</h1>
          <p className="text-lg">{question.body}</p>
          <p className="text-sm text-gray-500">
            {question.user}
          </p>
          
          <div className="mt-4">
            <strong>Tags:</strong>
            <ul className="flex gap-2 flex-wrap">
              {tagDetails.length > 0 ? (
                tagDetails.map((tag, index) => (
                  <li
                    key={index}
                    className="bg-gray-300 px-2 py-1 rounded-full text-sm text-blue-600"
                  >
                    {tag.name}
                  </li>
                ))
              ) : (
                <p>No tags available.</p>
              )}
            </ul>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center">
              <FaThumbsUp className="text-blue-600" />
              <span>{question.like_count}</span>
            </div>
            <div className="flex items-center">
              <FaThumbsDown className="text-red-600" />
              <span>{question.dislike_count}</span>
            </div>
          </div>

          <div className="mt-6 w-full">
            <h2 className="text-xl font-semibold">Answers ({question.number_of_answers})</h2>
            {answers.length > 0 ? (
              answers.map((answer) => (
                <div key={answer.id} className="border-2 p-4 rounded-lg mb-4">
                  <p><strong>{answer.user}</strong></p>
                  <p>{answer.body}</p>
                  <div className="flex gap-4 mt-4">
                    <div className="flex items-center">
                      <FaThumbsUp className="text-blue-600" />
                      <span>{answer.like_count}</span>
                    </div>
                    <div className="flex items-center">
                      <FaThumbsDown className="text-red-600" />
                      <span>{answer.dislike_count}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{answer.created_at}</p>
                </div>
              ))
            ) : (
              <p>No answers yet.</p>
            )}
          </div>
        </div>
      </main>
    );
  } catch (err) {
    console.error("Error fetching data:", err);
    return (
      <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
        <div className="flex flex-col items-center gap-4 w-full">
          <h1 className="text-2xl font-semibold">Error</h1>
          <p className="text-lg">Sorry, something went wrong while fetching the data.</p>
        </div>
      </main>
    );
  }
};

export default QuestionDetailPage;
