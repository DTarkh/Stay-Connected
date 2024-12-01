'use client'
import { useState } from "react";
const AddQuestion = () => {
    const [title, setTitle] = useState(""); // State for question title
  const [description, setDescription] = useState(""); // State for question description

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic to handle the form submission
    console.log("Title:", title);
    console.log("Description:", description);
    // Clear the form fields after submission
    setTitle("");
    setDescription("");
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-[700px] h-[60vh]  mx-auto bg-white p-6 shadow-md rounded-md  flex flex-col justify-center gap-6"
    >
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
          rows="4"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-4 bg-sky-700 text-white font-semibold rounded-2xl hover:bg-cyan-600"
      >
        Create
      </button>
    </form>
  )
}

export default AddQuestion