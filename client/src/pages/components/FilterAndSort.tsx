import { useEffect, useState } from "react";
import styles from "../../assets/styles/filter-and-sort.module.css";
import { TAGS } from "../../types/Post";

interface FilterAndSortProps {
  filterPostsByTags: (tags: string[]) => void;
  sortPostsByDate: (order: 'asc' | 'desc') => void;
}

function FilterAndSort({ filterPostsByTags, sortPostsByDate }: FilterAndSortProps) {
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
    const order = event.target.value as 'asc' | 'desc';
    sortPostsByDate(order);
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.tagContainer}>
        <p>Filter by tag</p>
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
