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

const createUsers = async () => {
  console.log("Creating users...");
  for (const user of users) {
    await createUser(user);
  }
  console.log("Users created.");
};

const createPosts = async () => {
  console.log("Creating posts...");
  for (const post of posts) {
    await insertPost(post);
  }
  console.log("Posts created.");
};

const createRatings = async () => {
  console.log("Creating ratings...");
  for (const rating of ratings) {
    await createRating(rating);
  }
  console.log("Ratings created.");
};

const createComments = async () => {
  console.log("Creating comments...");
  for (const comment of comments) {
    await insertComment(comment);
  }
  console.log("Comments created.");
};

const createCommentLikes = async () => {
  console.log("Creating comment likes...");
  for (const commentLike of commentLikes) {
    await toggleLike(commentLike.user_id, commentLike.comment_id);
  }
  console.log("Comment likes created.");
};

// Call the functions to populate the data
createUsers()
  .then(() => {
    console.log("Users populated.");
    return createPosts();
  })
  .then(() => {
    console.log("Posts populated.");
    return createRatings();
  })
  .then(() => {
    console.log("Ratings populated.");
    return createComments();
  })
  .then(() => {
    console.log("Comments populated.");
    return createCommentLikes();
  })
  .then(() => {
    console.log("Comment likes populated.");
    console.log("All data successfully populated.");
  })
  .catch(console.error);
