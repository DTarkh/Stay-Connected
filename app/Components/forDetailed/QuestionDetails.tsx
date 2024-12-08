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
  number_of_answers: number;
}

const QuestionDetails = ({ question }: { question: Question }) => (
  <div className="flex flex-col items-start gap-6 w-full bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
    {/* Header Section */}
    <div className="flex justify-between w-full items-center">
      <h1 className="text-3xl font-extrabold text-purple-800 hover:text-purple-600 transition-colors duration-200">
        {question.subject}
      </h1>
      <div className="flex gap-6 items-center text-sm text-gray-600">
        {/* Like/Dislike Section */}
        <div className="flex items-center gap-2 group">
          <FaThumbsUp className="text-green-500 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-gray-700">
            {question.like_count}
          </span>
        </div>
        <div className="flex items-center gap-2 group">
          <FaThumbsDown className="text-red-500 group-hover:scale-110 transition-transform duration-200" />
          <span className="font-medium text-gray-700">
            {question.dislike_count}
          </span>
        </div>

        {/* User and Date */}
        <p className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
          {question.user}
        </p>
        <p className="italic text-blue-500 hover:text-blue-700 transition-colors duration-200">
          {question.created_at}
        </p>
      </div>
    </div>

    {/* Question Body */}
    <p className="text-lg text-gray-800 leading-relaxed hover:text-purple-700 transition-colors duration-200">
      {question.body}
    </p>

    {/* Tags Section */}
    <Tags tagDetails={question.tag_details} />
  </div>
);

export default QuestionDetails;
