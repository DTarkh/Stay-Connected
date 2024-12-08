"use client";
import { useState } from "react";
import TagComponent from "@/app/Components/TagComponent";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const AddQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      subject: title,
      body: description,
      tags: selectedTags,
    };

    // const accessToken =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMzNDk4MjE0LCJpYXQiOjE3MzM0OTQ2MTQsImp0aSI6IjJmOGEwNzdiNDRmNzQwMjg4ZTIyZTAwYWJhODlhMTI4IiwidXNlcl9pZCI6MTd9.kHX7BlYE7jAm8UemYtnfWwyFlWfKuwHmCXDMCNRRVUs";

    const accessToken = Cookies.get("accessToken");

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

      // Reset form fields
      setTitle("");
      setDescription("");
      setSelectedTags([]);
      redirect("/main");
    } catch (error) {
      console.error("Error submitting the question:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-[700px] h-auto min-h-[80vh] mx-auto bg-white p-8 shadow-lg rounded-lg flex flex-col justify-start gap-6 relative mt-16"
    >
      <div className="mb-6">
        <label htmlFor="title" className="block text-gray-800 font-medium mb-2">
          Question Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter the question title"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition text-black"
          required
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-gray-800 font-medium mb-2"
        >
          Question Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter the question description"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition text-black"
          rows={4}
          required
        />
      </div>

      <div className="mb-6">
        <TagComponent
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-sky-600 text-white font-semibold rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
      >
        Create
      </button>
    </form>
  );
};

export default AddQuestion;
