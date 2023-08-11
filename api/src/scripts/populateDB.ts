// Import models and services
import { createUser } from "../services/auth.service";
import { insertPost } from "../services/blog.service";
import { createRating } from "../services/rating.service";
import { insertComment, toggleLike } from "../services/comment.service";

// Import sample data
import { users } from "./populateUsers";
import { posts } from "./populatePosts";
import { ratings } from "./populateRatings";
import { comments } from "./populateComments";
import { commentLikes } from "./populateCommentLikes";

// Run this script with the following command:
// cd api
// ts-node src/scripts/populate.ts

// Helper function to introduce delay
const delay = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const createUsers = async () => {
  console.log("Creating users...");
  for (const user of users) {
    console.log("Processing user:", user);
    try {
      await createUser(user);
    } catch (error) {
      console.error("Error creating user:", error);
      // Stop the entire process if there is an error
      throw new Error("Stopping due to user creation failure.");
    }
  }
  console.log("Users created.");
};

const createPosts = async () => {
  console.log("Creating posts...");
  for (const post of posts) {
    try {
      await insertPost(post);
      // a delay to ensure that the posts are created in order
      await delay(1000)
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Stopping due to post creation failure.");
    }
  }
  console.log("Posts created.");
};

const createRatings = async () => {
  console.log("Creating ratings...");
  for (const rating of ratings) {
    try {
      await createRating(rating);
    } catch (error) {
      console.error("Error creating rating:", error);
      throw new Error("Stopping due to rating creation failure.");
    }
  }
  console.log("Ratings created.");
};

const createComments = async () => {
  console.log("Creating comments...");
  for (const comment of comments) {
    try {
      await insertComment(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      throw new Error("Stopping due to comment creation failure.");
    }
  }
  console.log("Comments created.");
};

const createCommentLikes = async () => {
  console.log("Creating comment likes...");
  for (const commentLike of commentLikes) {
    try {
      await toggleLike(commentLike.user_id, commentLike.comment_id);
    } catch (error) {
      console.error("Error creating comment like:", error);
      throw new Error("Stopping due to user comment like creation failure.");
    }
  }
  console.log("Comment likes created.");
};

// Call the functions to populate the data
createUsers()
  .then(createPosts)
  .then(createRatings)
  .then(createComments)
  .then(createCommentLikes)
  .then(() => {
    console.log("All data successfully populated.");
  })
  .catch((error) => {
    console.error("Error populating data:", error);
    process.exit(1); // Exit the script with an error code
  });
