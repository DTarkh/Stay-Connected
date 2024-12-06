import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import Tags from "./Tags";

interface TagDetail {
  name: string;
}

interface Question {
  user: string;
  subject: string;
  body: string;
  tag_details: TagDetail[];
  like_count: number;
  dislike_count: number;
  created_at: string;
}

const QuestionDetails = ({ question }: { question: Question }) => (
  <div className="flex flex-col items-start gap-4 w-full">
    <div className="flex justify-between w-full">
      <h1 className="text-2xl font-semibold">{question.subject}</h1>
      <div className="flex gap-4 items-center text-sm text-gray-500">
        <div className="flex items-center">
          <FaThumbsUp className="text-blue-600" />
          <span>{question.like_count}</span>
        </div>
        <div className="flex items-center">
          <FaThumbsDown className="text-red-600" />
          <span>{question.dislike_count}</span>
        </div>
        <p>{question.user}</p>
        <p>{question.created_at}</p>
      </div>
    </div>
    <p className="text-lg">{question.body}</p>
    <Tags tagDetails={question.tag_details} />
  </div>
);

export default QuestionDetails;
