import React from "react";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

export interface QuestionData {
  id: number;
  user: string;
  subject: string;
  body: string;
  tag_details: { name: string }[];
  number_of_answers: number;
  created_at: string;
  like_count: number;
  dislike_count: number;
}

const Questions = ({ item }: { item: QuestionData }) => {
  return (
    <div
      key={item.id}
      className="bg-gradient-to-br from-purple-100 via-white to-purple-50 shadow-lg rounded-lg p-6 w-full max-w-3xl transition-transform transform hover:scale-105"
    >
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-700">{item.subject}</h3>
        <p className="text-m text-indigo-700">
          <strong>Author:</strong> {item.user}
        </p>
      </div>

      {/* Body Section */}
      <p className="text-base text-gray-800 mb-4 leading-relaxed">
        {item.body}
      </p>

      {/* Tags and Meta Information */}
      <div className="flex justify-between items-center">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tag_details.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-200 text-purple-700 rounded-full py-1 px-3 text-xs font-medium"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Answers and Date */}
        <div className="text-sm text-gray-600 flex flex-col md:flex-row gap-2">
          <span>
            <strong>Answers:</strong> {item.number_of_answers}
          </span>
          <span className="text-blue-500">
            <strong>Date:</strong> {item.created_at}
          </span>
        </div>
      </div>

      {/* Likes and Dislikes */}
      <div className="flex items-center gap-6 mt-4">
        <div className="flex items-center gap-1 text-green-600">
          <FaThumbsUp size={18} />
          <span className="text-sm font-medium">{item.like_count}</span>
        </div>
        <div className="flex items-center gap-1 text-red-500">
          <FaThumbsDown size={18} />
          <span className="text-sm font-medium">{item.dislike_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
