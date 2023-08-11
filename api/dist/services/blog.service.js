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
exports.removePost = exports.editPost = exports.insertPost = exports.fetchPost = exports.fetchAllPosts = void 0;
const db_1 = require("../config/db");
const comment_service_1 = require("./comment.service");
const fetchAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query("SELECT * FROM posts");
    // The first element is an array of rows from the db (with each row being a RowDataPacket),
    // and the second element an array of FieldPacket that contains metadata about the fields.
    // We only care about the first element (the rows), so we destructure it out into a variable 'rows'.
    return rows.map((row) => {
        // This function takes a row and returns an object that matches the shape of the Post interface.
        return {
            id: row.id,
            title: row.title,
            content: row.content,
            author: row.author,
            user_id: row.user_id,
            image: row.image,
            tags: row.tags,
            created_at: row.created_at,
        };
    });
});
exports.fetchAllPosts = fetchAllPosts;
const fetchPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query("SELECT * FROM posts WHERE id = ?", [id]);
    return {
        id: rows[0].id,
        title: rows[0].title,
        content: rows[0].content,
        author: rows[0].author,
        user_id: rows[0].user_id,
        image: rows[0].image,
        tags: rows[0].tags,
    };
});
exports.fetchPost = fetchPost;
const insertPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, author, user_id, image, tags } = post;
    const [result] = yield db_1.db.query("INSERT INTO posts SET ?", { title, content, author, user_id, image, tags });
    return {
        id: result.insertId,
        title,
        content,
        author,
        user_id,
        image,
        tags,
    };
});
exports.insertPost = insertPost;
const editPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, title, content, image, tags } = post;
    try {
        const [rows] = yield db_1.db.query("UPDATE posts SET title = ?, content = ?, image = ?, tags = ? WHERE id = ?", [title, content, image, tags, id]);
    }
    catch (error) {
        console.log(error);
    }
    return {
        id,
        title,
        content,
        image,
        tags,
    };
});
exports.editPost = editPost;
/**
 * Removes a post with the given ID from the database.
 *
 * This function performs the following steps within a transaction:
 * 1. Retrieves all comments related to the post.
 * 2. Deletes each related comment using the `removeComment` function.
 * 3. Deletes all ratings associated with the post.
 * 4. Deletes the post itself from the 'posts' table.
 *
 * If any step fails, the entire transaction is rolled back to ensure
 * database consistency.
 */
const removePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield db_1.db.getConnection();
    try {
        yield connection.query('START TRANSACTION');
        // get all comments related to this post
        const [comments] = yield connection.query("SELECT id FROM comments WHERE post_id = ?", [id]);
        // remove each comment using the existing removeComment function
        for (const comment of comments) {
            yield (0, comment_service_1.removeComment)(comment.id, connection);
        }
        // delete all ratings associated with this post
        yield connection.query("DELETE FROM ratings WHERE post_id = ?", [id]);
        // delete the post itself
        const [rows] = yield connection.query("DELETE FROM posts WHERE id = ?", [id]);
        yield connection.query('COMMIT');
        connection.release();
        return {
            id,
        };
    }
    catch (error) {
        yield connection.query('ROLLBACK');
        connection.release();
        throw error;
    }
});
exports.removePost = removePost;
//# sourceMappingURL=blog.service.js.map