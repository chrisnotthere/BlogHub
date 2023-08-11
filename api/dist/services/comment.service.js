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
exports.checkUserLike = exports.toggleLike = exports.removeComment = exports.fetchAllComments = exports.insertComment = void 0;
const db_1 = require("../config/db");
const insertComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const { post_id, user_id, author, content } = comment;
    const [result] = yield db_1.db.query("INSERT INTO comments (post_id, user_id, author, content) VALUES (?, ?, ?, ?)", [post_id, user_id, author, content]);
    const [rows] = yield db_1.db.query("SELECT * FROM comments WHERE id = ?", [result.insertId]);
    if (rows.length > 0) {
        return rows[0];
    }
    else {
        throw new Error("Error in creating comment");
    }
});
exports.insertComment = insertComment;
const fetchAllComments = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query("SELECT * FROM comments WHERE post_id = ?", [postId]);
    if (rows.length > 0) {
        return rows;
    }
    else {
        return [];
    }
});
exports.fetchAllComments = fetchAllComments;
/**
 * Removes a comment with the given ID from the database.
 *
 * This function may be used within the context of a larger transaction, such as when deleting
 * a post along with its related comments. The transaction context can be passed as an optional parameter.
 *
 * Steps performed by the function:
 * 1. Verifies that the provided ID is a number.
 * 2. If a transaction context is provided, it uses that context; otherwise, it uses the default database connection.
 * 3. Deletes all likes associated with the comment from the 'comment_likes' table.
 * 4. Deletes the comment itself from the 'comments' table.
 */
const removeComment = (id, transaction) => __awaiter(void 0, void 0, void 0, function* () {
    if (isNaN(id)) {
        throw new Error("Comment id is not a number");
    }
    // use the transaction context if provided
    const context = transaction || db_1.db;
    // delete all likes associated with this comment
    yield context.query("DELETE FROM comment_likes WHERE comment_id = ?", [id]);
    // then, delete the comment itself
    const [result] = yield context.query("DELETE FROM comments WHERE id = ?", [id]);
    if (!result.affectedRows) {
        throw new Error("Error in deleting comment, or comment not found");
    }
});
exports.removeComment = removeComment;
/**
 * Toggles a like for a specific comment by a user.
 * If the user has already liked the comment, the like is removed.
 * If the user has not liked the comment, a like is added.
 * The total number of likes for the comment is also updated in the comments table.
 */
const toggleLike = (userId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hasLiked = yield (0, exports.checkUserLike)(userId, commentId);
        if (hasLiked) {
            yield db_1.db.query("DELETE FROM comment_likes WHERE user_id = ? AND comment_id = ?", [userId, commentId]);
            yield db_1.db.query("UPDATE comments SET likes = likes - 1 WHERE id = ?", [
                commentId,
            ]);
        }
        else {
            yield db_1.db.query("INSERT INTO comment_likes (user_id, comment_id) VALUES (?, ?)", [userId, commentId]);
            yield db_1.db.query("UPDATE comments SET likes = likes + 1 WHERE id = ?", [
                commentId,
            ]);
        }
    }
    catch (error) {
        console.error("Error in toggleLike service:", error); // Log the error details
        throw error;
    }
});
exports.toggleLike = toggleLike;
const checkUserLike = (userId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield db_1.db.query("SELECT * FROM comment_likes WHERE user_id = ? AND comment_id = ?", [userId, commentId]);
        return rows.length > 0;
    }
    catch (error) {
        console.error("Error in checkUserLike:", error);
        throw error;
    }
});
exports.checkUserLike = checkUserLike;
//# sourceMappingURL=comment.service.js.map