'use client'
import React, { useState } from "react";
import { API_ROUTES } from "@/app/utils/apiClient";

interface AddAnswerFormProps {
  questionId: string;
  accessToken: string;
}

const AddAnswerForm: React.FC<AddAnswerFormProps> = ({ questionId, accessToken }) => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const url = `${API_ROUTES.submitAnswer}${questionId}/answers/`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          body: answer,
          status: "pending",
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Failed to submit the answer. Server responded: ${errorText}`);
      }

      setAnswer("");
      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <form onSubmit={handleSubmit} className="flex gap-4 w-full">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Add your answer"
          className="border-2 p-2 rounded w-4/5 text-black"
          required
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded w-1/5">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAnswerForm;
