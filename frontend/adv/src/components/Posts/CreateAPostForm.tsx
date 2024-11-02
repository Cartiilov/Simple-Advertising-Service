import { useState } from "react";
import { Button } from "../Buttons/Button";
import { useCreatePost, useGetAllPosts } from "../../hooks/PostHooks";
import { useCreatePhoto } from "../../hooks/PhotoHooks";
import styles from "./CreateAPostForm.module.css";

const CreateAPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [photo, setPhoto] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const { createPhoto, isLoading, error, photoResponse } = useCreatePhoto();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      setStatusMessage("Title and/or content cannot be empty.");
      return;
    }
    try {
      const response = await useCreatePost(title, content);
      setTitle("");
      setContent("");
      setStatusMessage("Post created successfully!");

      try {
        if (photo) console.log("before calling createPhoto");
        await createPhoto(response.postId, photo);
      } catch (error) {
        console.error(error);
        setStatusMessage("Failed to upload photo.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("Failed to create post.");
    }
    const posts = await useGetAllPosts();
    setAllPosts(posts);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  return (
    <div className={styles.createPostForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.createPostFormTitle}>
          <label className={styles.CreateApostTitleLabel}>
            <div>CREATE A POST</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </div>
        <div className={styles.createPostFormContent}>
          <label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Upload Photo:
            <input type="file" onChange={handlePhotoChange} />
          </label>
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {photoResponse && <p>Photo uploaded successfully!</p>}
        <div className={styles.buttonAndStatusContainer}>
          <Button
            buttonStyle="btn--outline2"
            type="submit"
            onClick={undefined}
            buttonSize={undefined}
          >
            Submit
          </Button>
          <div>{statusMessage}</div> {}
        </div>
      </form>
    </div>
  );
};

export default CreateAPostForm;
