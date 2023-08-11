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
exports.checkIfUserLikedController = exports.likeToggleController = exports.deleteCommentController = exports.getAllCommentsController = exports.createCommentController = void 0;
const comment_service_1 = require("../services/comment.service");
const createCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, user_id, author, content } = req.body;
    if (!post_id || !user_id || !author || !content) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const comment = { post_id, user_id, author, content };
    try {
        const newComment = yield (0, comment_service_1.insertComment)(comment);
        return res
            .status(201)
            .json({ data: newComment, message: "Successfully created comment" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.createCommentController = createCommentController;
const getAllCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId } = req.params;
    if (!postId) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    try {
        const comments = yield (0, comment_service_1.fetchAllComments)(Number(postId));
        return res
            .status(200)
            .json({ data: comments, message: "Successfully retrieved comments" });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
exports.getAllCommentsController = getAllCommentsController;
const deleteCommentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = parseInt(req.params.commentId);
    if (isNaN(commentId)) {
        return res.status(400).send({ error: "Invalid id" });
    }
    try {
        yield (0, comment_service_1.removeComment)(commentId);
        return res.status(200).send({ message: "Comment deleted successfully" });
    }
    catch (error) {
        return res.status(500).send({ error: error.message });
    }
});
exports.deleteCommentController = deleteCommentController;
const likeToggleController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, commentId } = req.body;
    try {
        yield (0, comment_service_1.toggleLike)(userId, commentId);
        res.status(200).json({ message: "Like toggled successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.likeToggleController = likeToggleController;
const checkIfUserLikedController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, commentId } = req.body;
    try {
        const hasLiked = yield (0, comment_service_1.checkUserLike)(userId, commentId);
        res.status(200).json({ data: hasLiked });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.checkIfUserLikedController = checkIfUserLikedController;
//# sourceMappingURL=comment.controller.js.map