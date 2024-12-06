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
      className="border-2 border-gray-300 p-4 rounded-xl w-full max-w-3xl"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-blue-600">{item.subject}</h3>
        <p className="text-sm text-gray-700">
          <strong>Author:</strong> {item.user}
        </p>
      </div>
      
      <p className="text-sm text-gray-800 mt-2">{item.body}</p>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 flex-wrap">
          {item.tag_details.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm ">
          <span className="text-gray-700">
            <strong>Answers:</strong> {item.number_of_answers}
          </span>
          <span className="text-gray-500">
            <strong>Date:</strong> {item.created_at}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1 text-green-600">
          <FaThumbsUp size={16} />
          <span className="text-sm font-medium">{item.like_count}</span>
        </div>
        <div className="flex items-center gap-1 text-red-600">
          <FaThumbsDown size={16} />
          <span className="text-sm font-medium">{item.dislike_count}</span>
        </div>
      </div>
    </div>
  );
};

export default Questions;
