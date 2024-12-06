import React from "react";

interface TagSelectorProps {
  selectedTags: string[]; // The selected tags array
  setSelectedTags: (tags: string[]) => void; // Function to update the selected tags
}

const tagsList = [
  "Database Optimization",
  "Django",
  "Django Admin",
  "Django Custom User",
  "Django Queries",
  "Django Rest Framework",
  "Django Views Python",
  "Serializers",
];

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  setSelectedTags,
}) => {
  const handleCheckboxChange = (tag: string) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((selectedTag) => selectedTag !== tag)
        : [...selectedTags, tag]
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-lg">Select Tags:</h3>
      {tagsList.map((tag) => (
        <div key={tag} className="flex items-center gap-2">
          <input
            type="checkbox"
            id={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => handleCheckboxChange(tag)}
            className="h-4 w-4"
          />
          <label htmlFor={tag} className="text-sm text-gray-700">
            {tag}
          </label>
        </div>
      ))}
    </div>
  );
};

export default TagSelector;