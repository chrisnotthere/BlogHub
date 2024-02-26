import { useEffect, useState } from "react";
import { TAGS } from "../../types/Post";

interface FilterAndSortProps {
  filterPostsByTags: (tags: string[]) => void;
  sortPostsByDate: (order: "asc" | "desc") => void;
}

function FilterAndSort({
  filterPostsByTags,
  sortPostsByDate,
}: FilterAndSortProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [tags] = useState<string[]>(TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    filterPostsByTags(selectedTags);
  }, [selectedTags, filterPostsByTags]);

  /**
   * Toggles the selection of a tag within the selected tags list.
   * If the tag is already selected, it will be removed from the list; otherwise, it will be added.
   *
   * @param {string} tag - The tag to be toggled within the selected tags list.
   */
  const toggleTagSelection = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];
      return newSelectedTags;
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const order = event.target.value as "asc" | "desc";
    sortPostsByDate(order);
  };

  const closeFilterAndSortMenu = () => {
    setIsMenuVisible(false);
  };

  return isMenuVisible? (
    <div className="hidden sm:flex flex-col max-w-[190px] p-4 rounded shadow-md bg-soft-mint border-2 border-bright-teal fixed top-20 right-8 z-10">
      <div className="flex flex-col">
        <div className="flex justify-between items-center w-full">
          <p>Filter by</p>
          <button
            onClick={() => {
              closeFilterAndSortMenu();
            }}
            className="flex items-center justify-center cursor-pointer rounded-full border border-bright-teal bg-white w-9 h-9 transition-colors duration-300 ease-in hover:bg-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <div
              key={tag}
              className={`cursor-pointer transition-all duration-200 ease-linear bg-lavender p-2 rounded text-xs text-gray-800 ${
                selectedTags.includes(tag) ? "bg-mint-green text-white shadow-md" : ""
              }`}
              onClick={() => toggleTagSelection(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
  
      <div className="flex flex-col items-start">
        <p>Sort by</p>
        <select
          onChange={handleSortChange}
          className="cursor-pointer p-2 mt-2 text-xs rounded border border-bright-teal bg-white"
        >
          <option value="desc">Date (newest first)</option>
          <option value="asc">Date (oldest first)</option>
        </select>
      </div>
    </div>
  ) : null;

}

export default FilterAndSort;
