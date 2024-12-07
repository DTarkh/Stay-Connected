import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface Answer {
  user: string;
  body: string;
  id: number;
  like_count: number;
  dislike_count: number;
  created_at: string;
}

const AnswerList = ({ answers, number_of_answers }: { answers: Answer[], number_of_answers: number }) => (
  <div className="mt-6 w-full border-2 border-gray-700 p-4 rounded-lg">
    <h2 className="text-xl font-semibold">Answers ({number_of_answers})</h2>
    {answers.length > 0 ? (
      answers.map((answer) => (
        <div key={answer.id} className="border-b-2 p-4">
          <p>{answer.body}</p>
          <div className="flex justify-end items-center gap-4 mt-4 text-sm text-gray-500">
            <div className="flex items-center">
              <FaThumbsUp className="text-blue-600" />
              <span>{answer.like_count}</span>
            </div>
            <div className="flex items-center">
              <FaThumbsDown className="text-red-600" />
              <span>{answer.dislike_count}</span>
            </div>
            <p>{answer.user}</p>
            <p>{answer.created_at}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No answers yet.</p>
    )}
  </div>
);

export default AnswerList;
