import { useEffect, useState } from "react";
import styles from "../../assets/styles/filter-and-sort.module.css";
import { Post, TAGS } from "../../types/Post";

interface FilterAndSortProps {
  filterPostsByTags: (tags: string[]) => void;
}

function FilterAndSort( { filterPostsByTags }: FilterAndSortProps) {
  const [tags, setTags] = useState<string[]>(TAGS);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // useEffect(() => {
  //   setTags(TAGS);
  //   console.log("tags: ", tags);
  // }, []);

  useEffect(() => {
    filterPostsByTags(selectedTags);
  }, [selectedTags, filterPostsByTags]);


  const toggleTagSelection = (tag: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag];
      console.log("Toggling tag selection:", tag, "New selected tags:", newSelectedTags);
      return newSelectedTags;
    });
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
      </div>
    </div>
  );
}

export default FilterAndSort;
