"use client";
import React, { useState } from "react";
import { API_ROUTES } from "@/app/utils/apiClient";

interface AddAnswerFormProps {
  questionId: string;
  accessToken: string;
}

const AddAnswerForm: React.FC<AddAnswerFormProps> = ({
  questionId,
  accessToken,
}) => {
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
        throw new Error(
          `Failed to submit the answer. Server responded: ${errorText}`
        );
      }

      setAnswer("");
      alert("Answer submitted successfully!");
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <div className="flex items-center justify-between mt-6">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 w-full bg-white p-4 rounded-lg"
      >
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Add your answer"
          className="border-2 border-gray-300 p-3 rounded-lg w-72 text-gray-800 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-all duration-300"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold p-3 h-12 rounded-lg hover:from-purple-700 hover:to-purple-600 focus:ring-2 focus:ring-purple-400 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddAnswerForm;
