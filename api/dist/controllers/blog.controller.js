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
exports.deletePostController = exports.updatePostController = exports.createPostController = exports.getPostController = exports.getAllPostsController = void 0;
const blog_service_1 = require("../services/blog.service");
const getAllPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, blog_service_1.fetchAllPosts)();
        res.send({ data: posts, message: "from posts table" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong.", error: err });
    }
});
exports.getAllPostsController = getAllPostsController;
const getPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const post = yield (0, blog_service_1.fetchPost)(id);
        res.send({ data: post, message: "from posts table" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong.", error: err });
    }
});
exports.getPostController = getPostController;
const createPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const files = req.files;
        // Check if a file has been uploaded or a default image is being used
        let imagePath;
        if (files["image"] && files["image"][0]) {
            imagePath = files["image"][0].path;
        }
        else if (req.body.image === 'images/default.webp') {
            imagePath = req.body.image;
        }
        else {
            return res.status(400).send({ message: "No image provided." });
        }
        const newPostData = Object.assign(Object.assign({}, req.body), { image: imagePath });
        const newPost = yield (0, blog_service_1.insertPost)(newPostData);
        res.send({ data: newPost, message: "post created" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong.", error: err });
    }
});
exports.createPostController = createPostController;
const updatePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, author, user_id, useExistingImage, tags } = req.body;
        const id = Number(req.params.id); // convert id to a number
        let image;
        if (useExistingImage === "true") {
            // Retrieve the existing image URL from the database
            const existingPost = yield (0, blog_service_1.fetchPost)(id);
            image = existingPost.image;
        }
        else if (req.files && req.files["image"]) {
            image = req.files["image"][0].path;
        }
        const updatedPost = yield (0, blog_service_1.editPost)({
            id,
            title,
            content,
            author,
            user_id,
            image,
            tags
        });
        res.send({ data: updatedPost, message: "post updated" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong.", error: err });
    }
});
exports.updatePostController = updatePostController;
const deletePostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const deletedPost = yield (0, blog_service_1.removePost)(id);
        res.send({ data: deletedPost, message: "post deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Something went wrong.", error: err });
    }
});
exports.deletePostController = deletePostController;
//# sourceMappingURL=blog.controller.js.map