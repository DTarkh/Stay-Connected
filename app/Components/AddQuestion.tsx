"use client";
import { useState } from "react";
import TagComponent from "@/app/Components/TagComponent";
import Cookies from "js-cookie";

const AddQuestion = () => {
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isAddQuestionMenuOpen, setIsAddQuestionMenuOpen] = useState(true); 

  const accessToken = Cookies.get("access_token");  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      subject: title, 
      body: description,
      tags: selectedTags, 
    };

    if (!accessToken) {
      console.error("No access token found!");
      return;
    }

    try {
      const response = await fetch(
        "https://nunu29.pythonanywhere.com/questions/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,  
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the question");
      }

      const data = await response.json();
      console.log("Question submitted successfully:", data);

      setTitle("");
      setDescription("");
      setSelectedTags([]);
      setIsAddQuestionMenuOpen(false);  
    } catch (error) {
      console.error("Error submitting the question:", error);
    }
  };

  return (
    isAddQuestionMenuOpen && (  
      <form
        onSubmit={handleSubmit}
        className="w-[700px] h-[80vh] mx-auto bg-white p-6 shadow-md rounded-md flex flex-col justify-center gap-6 relative"
      >
        <button
          type="button"
          className="btn btn-square absolute top-3 right-3"
          onClick={() => setIsAddQuestionMenuOpen(false)} 
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
          >
            Question Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the question title"
            className="w-full px-4 py-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            Question Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the question description"
            className="w-full px-4 py-2 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <TagComponent
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
        <button
          type="submit"
          className="w-full px-4 py-4 bg-sky-700 text-white font-semibold rounded-2xl hover:bg-cyan-600"
        >
          Create
        </button>
      </form>
    )
  );
};

export default AddQuestion;
