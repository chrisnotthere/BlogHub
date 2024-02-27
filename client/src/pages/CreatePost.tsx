import { useContext, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./components/Editor";
import { UserContext } from "../context/UserContext";
import { TAGS } from "../types/Post";
import ReactSelect from "react-select";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [labelText, setLabelText] = useState("No file chosen");
  const [tags, setTags] = useState<string[]>([]);
  const [useDefaultImage, setUseDefaultImage] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [imageError, setImageError] = useState("");
  const [contentError, setContentError] = useState("");
  const [postError, setPostError] = useState("");

  const { userInfo } = useContext(UserContext);

  const options = TAGS.map((tag) => ({
    label: tag,
    value: tag,
  })) as { label: string; value: string }[];

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontSize: ".8rem",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      fontSize: ".8rem",
    }),
  };

  const handleUseDefaultImage = () => {
    setUseDefaultImage(true);
    setImage(null);
    setImageError("");
    setLabelText("No file chosen");

    // Clear file input if any
    if (fileInputRef.current) {
      (fileInputRef.current as any).value = null;
    }
  };

  const handleUpdateText = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files;
    if (files) {
      setImage(files);
      setLabelText(`${files.length} file chosen`);
    }
  };

  async function createNewPost(e: { preventDefault: () => void }) {
    e.preventDefault();

    if (!image && !useDefaultImage) {
      setImageError(
        "You must either select an image or use the default image."
      );
      return;
    }

    if (!content.trim()) {
      setContentError("Blog content cannot be empty.");
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("content", content);
    formData.set("author", userInfo.username);
    formData.set("user_id", userInfo.user_id);
    formData.set("tags", tags.join(","));

    if (useDefaultImage) {
      formData.set("image", "images/default.webp");
    } else if (image) {
      formData.set("image", image[0]);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_HEROKU_URL}posts/createPost`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setPostError(
          errorData.message || "Something went wrong while creating the post."
        );
      } else {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
      setPostError("An unexpected error occurred. Please try again later.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mx-auto w-full max-w-md md:max-w-xl lg:max-w-4xl my-12 sm:my-16 md:my-20 lg:my-28 p-1 sm:p-3 md:p-8 rounded-lg bg-soft-mint shadow-2xl">
      <div className="bg-white p-8 rounded shadow-md">
        <form className="flex flex-col items-start" onSubmit={createNewPost}>
          <label htmlFor="title" className="text-bright-teal text-lg font-semibold">Title</label>
          <input
            type="title"
            placeholder="Title"
            id="title"
            className="mt-2 mb-2 w-full p-1 rounded border-2 border-neutral-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
  
          <label htmlFor="image" className="text-bright-teal text-lg font-semibold">Cover Image</label>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex flex-col">
              <button
                type="button"
                className="w-40 h-8 bg-white text-bright-teal rounded border-2 border-bright-teal font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300 ease-in-out"
                onClick={() => {
                  if (fileInputRef.current !== null) {
                    fileInputRef.current.click();
                  }
                }}
              >
                Upload File
              </button>
              <span className="mt-2">{labelText}</span>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={(ev) => {
                  setImage(ev.target.files);
                  setUseDefaultImage(false);
                  setImageError("");
                  handleUpdateText(ev);
                }}
                id="image"
              />
            </div>
  
            <div className="flex items-center gap-1">
              <button type="button" className="w-40 h-8 bg-white text-bright-teal rounded border-2 border-bright-teal font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300 ease-in-out" onClick={handleUseDefaultImage}>
                Use Default Image
              </button>
  
              <p className="ml-2">{useDefaultImage ? "Default image selected" : ""}</p>
            </div>
  
            {imageError && (
              <p className="text-red-500 text-sm mt-4">{imageError}</p>
            )}
  
          </div>
  
          <div className="flex gap-2 items-center mt-4">
            <label htmlFor="tags" className="text-bright-teal text-lg font-semibold">Tags</label>
            <ReactSelect
              id="tags"
              name="tags"
              isMulti
              options={options}
              styles={customStyles}
              onChange={(selectedOptions) => {
                const selectedTags = selectedOptions.map(
                  (option) => option.value
                );
                setTags(selectedTags);
              }}
            />
          </div>
  
          <div className="w-full mt-4 mb-20">
            <Editor value={content} onChange={setContent} />
          </div>
  
          {contentError && (
            <p className="text-red-500 text-sm mb-3">{contentError}</p>
          )}
  
          {postError && <p className="text-red-500 text-sm mb-3">{postError}</p>}
  
          <button className="w-32 h-8 bg-white text-bright-teal rounded border-2 border-bright-teal font-semibold hover:bg-bright-teal hover:text-white transition-colors duration-300 ease-in-out">Create post</button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
