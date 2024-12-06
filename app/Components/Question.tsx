import React from "react";

export interface QuestionData { 
  id: number;
  user: string;
  subject: string;
  body: string;
  tag_details: { name: string }[]; 
  number_of_answers: number;
  created_at: string; 
}

const Questions = ({ item }: { item: QuestionData }) => {
  return (
    <div key={item.id} className="border-2 border-gray-300 p-4 rounded-xl w-full max-w-3xl">
      <h3 className="text-xl font-semibold text-blue-600">{item.subject}</h3>
      <p className="text-sm text-gray-600 mt-1">
        <strong>Author:</strong> {item.user}
      </p>
      <p className="text-sm text-gray-800 mt-2">{item.body}</p>
      <div className="flex gap-2 mt-2 flex-wrap">
        {item.tag_details.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-xs"
          >
            {tag.name} 
          </span>
        ))}
      </div>
      <p className="text-sm text-gray-500 mt-2">
        <strong>Date:</strong> {item.created_at}
      </p>
      <p className="text-sm text-gray-500 mt-1">
        <strong>Answers:</strong> {item.number_of_answers}
      </p>
    </div>
  );
};

export default Questions;
