"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import models and services
const auth_service_1 = require("../services/auth.service");
const blog_service_1 = require("../services/blog.service");
const rating_service_1 = require("../services/rating.service");
const comment_service_1 = require("../services/comment.service");
// Import sample data
const populateUsers_1 = require("./populateUsers");
const populatePosts_1 = require("./populatePosts");
const populateRatings_1 = require("./populateRatings");
const populateComments_1 = require("./populateComments");
const populateCommentLikes_1 = require("./populateCommentLikes");
// Run this script with the following command:
// cd api
// ts-node src/scripts/populate.ts
// Helper function to introduce delay
const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
const createUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating users...");
    for (const user of populateUsers_1.users) {
        try {
            yield (0, auth_service_1.createUser)(user);
        }
        catch (error) {
            console.error("Error creating user:", error);
            // Stop the entire process if there is an error
            throw new Error("Stopping due to user creation failure.");
        }
    }
    console.log("Users created.");
});
const createPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating posts...");
    for (const post of populatePosts_1.posts) {
        try {
            yield (0, blog_service_1.insertPost)(post);
            // a delay to ensure that the posts are created in order
            yield delay(1000);
        }
        catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Stopping due to post creation failure.");
        }
    }
    console.log("Posts created.");
});
const createRatings = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating ratings...");
    for (const rating of populateRatings_1.ratings) {
        try {
            yield (0, rating_service_1.createRating)(rating);
        }
        catch (error) {
            console.error("Error creating rating:", error);
            throw new Error("Stopping due to rating creation failure.");
        }
    }
    console.log("Ratings created.");
});
const createComments = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating comments...");
    for (const comment of populateComments_1.comments) {
        try {
            yield (0, comment_service_1.insertComment)(comment);
        }
        catch (error) {
            console.error("Error creating comment:", error);
            throw new Error("Stopping due to comment creation failure.");
        }
    }
    console.log("Comments created.");
});
const createCommentLikes = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Creating comment likes...");
    for (const commentLike of populateCommentLikes_1.commentLikes) {
        try {
            yield (0, comment_service_1.toggleLike)(commentLike.user_id, commentLike.comment_id);
        }
        catch (error) {
            console.error("Error creating comment like:", error);
            throw new Error("Stopping due to user comment like creation failure.");
        }
    }
    console.log("Comment likes created.");
});
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
//# sourceMappingURL=populateDB.js.map