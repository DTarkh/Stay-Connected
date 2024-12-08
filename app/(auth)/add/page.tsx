'use client'
import { useState, useEffect } from "react";
import Cookies from "js-cookie";  
import { API_ROUTES, apiFetcher } from "@/app/utils/apiClient"; 

const AddQuestion = () => {
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState(""); 
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagsList, setTagsList] = useState<{ name: string }[]>([]); 
  const [successMessage, setSuccessMessage] = useState(""); 

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await apiFetcher<{ name: string }[]>(API_ROUTES.tags);
        setTagsList(tags || []);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      subject: title,
      body: description,
      tags: selectedTags,
    };

    const accessToken = Cookies.get("accessToken");

    if (!accessToken) {
      console.error("No access token found.");
      return;
    }

    try {
      const response = await fetch(API_ROUTES.submitAnswer, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the question");
      }

      const data = await response.json();
      console.log("Question submitted successfully:", data);

      setSuccessMessage("Question added successfully!");

      setTitle("");
      setDescription("");
      setSelectedTags([]);

      setTimeout(() => {
        window.location.href = "/main";
      }, 500); 
    } catch (error) {
      console.error("Error submitting the question:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl h-[80vh] mx-auto bg-white p-6 shadow-md rounded-md flex flex-col justify-center gap-6 relative mt-10"
    >
      <button
        type="button"
        className="btn btn-square absolute top-3 right-3"
        onClick={() => window.location.href = "/main"}  
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

      {successMessage && (
        <div className="text-green-600 text-center mb-4">
          {successMessage}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
          Question Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the question title"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
          Question Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the question description"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
          required
        />
      </div>

      {/* Tags  */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 font-semibold mb-2">
          Select Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {tagsList.map((tag) => (
            <label key={tag.name} className="flex items-center">
              <input
                type="checkbox"
                value={tag.name}  
                checked={selectedTags.includes(tag.name)} 
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedTags((prevSelectedTags) =>
                    prevSelectedTags.includes(value)
                      ? prevSelectedTags.filter((tag) => tag !== value)
                      : [...prevSelectedTags, value]
                  );
                }}
                className="mr-2"
              />
              <span className="text-gray-700">{tag.name}</span> 
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full px-4 py-3 bg-sky-700 text-white font-semibold rounded-lg hover:bg-cyan-600 focus:outline-none"
      >
        Create Question
      </button>
    </form>
  );
};

export default AddQuestion;
