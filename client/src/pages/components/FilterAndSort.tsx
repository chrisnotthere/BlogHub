import { useEffect, useRef, useState } from "react";
import styles from "../../assets/styles/filter-and-sort.module.css";
import { TAGS } from "../../types/Post";

interface FilterAndSortProps {
  filterPostsByTags: (tags: string[]) => void;
  sortPostsByDate: (order: "asc" | "desc") => void;
}

function FilterAndSort({
  filterPostsByTags,
  sortPostsByDate,
}: FilterAndSortProps) {
  const [tags] = useState<string[]>(TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortContainerPosition, setSortContainerPosition] = useState<"top" | "center">("top");

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

  const sortContainerStyle =
  sortContainerPosition === "top"
  ? { top: "10vh" }
  : { top: "40vh" };

  return (
    <div
      className={styles.menuContainer}
      style={sortContainerStyle}
    >
      <div className={styles.tagContainer}>
        <div className={styles.tagContainerTop}>
          <p>Filter by</p>
          <div className={styles.movementButtons}>
            <button
              className={styles.movementButton}
              onClick={() => {setSortContainerPosition("top");}}
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
                  d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            <button
              className={styles.movementButton}
              onClick={() => {setSortContainerPosition("center");}}
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
                  d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className={styles.tags}>
          {tags.map((tag) => (
            <div
              key={tag}
              className={`${styles.tag} ${
                selectedTags.includes(tag) ? styles.selectedTag : ""
              }`}
              onClick={() => toggleTagSelection(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.sortContainer}>
        <p>Sort by</p>
        <select className={styles.sortSelect} onChange={handleSortChange}>
          <option value="desc">Date (newest first)</option>
          <option value="asc">Date (oldest first)</option>
        </select>
      </div>
    </div>
  );
}

export default FilterAndSort;
