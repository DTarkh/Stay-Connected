import React from "react";

interface TagDetail {
  name: string;
}

const Tags = ({ tagDetails }: { tagDetails: TagDetail[] }) => (
  <div className="mt-4">
    <strong>Tags:</strong>
    <ul className="flex gap-2 flex-wrap">
      {tagDetails.length > 0 ? (
        tagDetails.map((tag, index) => (
          <li
            key={index}
            className="bg-gray-300 px-2 py-1 rounded-full text-sm text-blue-600"
          >
            {tag.name}
          </li>
        ))
      ) : (
        <p>No tags available.</p>
      )}
    </ul>
  </div>
);

export default Tags;
