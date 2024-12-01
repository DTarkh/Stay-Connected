import React from "react";

interface Answer {
  user: string;
  body: string;
  id: number;
  status: string;
  number_of_likes: number;
  created_at: string;
}

interface Question {
  id: number;
  user: string;
  subject: string;
  body: string;
  tags: string[];
  answers: Answer[];
  created_at: string;
}

async function fetchQuestion(id: string): Promise<Question | null> {
  const res = await fetch(`https://nunu29.pythonanywhere.com/questions/${id}/`);
  
  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const QuestionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  
  try {
    const question = await fetchQuestion(id);

    if (!question) {
      return (
        <>
          
          <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
            <div className="flex flex-col items-center gap-4 w-full">
              <h1 className="text-2xl font-semibold">Page Not Found</h1>
              <p className="text-lg">Sorry, the question with ID {id} does not exist.</p>
            </div>
          </main>
        </>
      );
    }

    return (
      <>
        <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-2xl font-semibold">{question.subject}</h1>
            <p className="text-lg">{question.body}</p>
            <div className="mt-4">
              <strong>Tags:</strong>
              <ul className="flex gap-2">
                {question.tags.map((tag, index) => (
                  <li key={index} className="bg-gray-300 px-2 py-1 rounded-full">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 w-full">
              <h2 className="text-xl font-semibold">Answers:</h2>
              {question.answers.length > 0 ? (
                question.answers.map((answer) => (
                  <div key={answer.id} className="border-2 p-4 rounded-lg mb-4">
                    <p><strong>{answer.user}</strong> (Status: {answer.status})</p>
                    <p>{answer.body}</p>
                    <p className="text-sm text-gray-500">{answer.created_at}</p>
                  </div>
                ))
              ) : (
                <p>No answers yet.</p>
              )}
            </div>
          </div>
        </main>
      </>
    );
  } catch (err) {
    return (
      <>
        <main className="flex flex-col min-h-screen justify-center gap-5 bg-blue-400 p-4">
          <div className="flex flex-col items-center gap-4 w-full">
            <h1 className="text-2xl font-semibold">Error</h1>
            <p className="text-lg">Sorry, something went wrong while fetching the data.</p>
          </div>
        </main>
      </>
    );
  }
};

export default QuestionDetailPage;
