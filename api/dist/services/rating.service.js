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
exports.getRatingSummaryByPostId = exports.getRatingByPostIdAndUserId = exports.updateRating = exports.createRating = exports.insertRating = exports.getExistingRating = void 0;
const db_1 = require("../config/db");
const getExistingRating = (userId, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield db_1.db.query("SELECT * FROM ratings WHERE user_id = ? AND post_id = ?", [userId, postId]);
    if (rows.length === 0) {
        return null;
    }
    return {
        id: rows[0].id,
        rating: rows[0].rating,
        user_id: rows[0].user_id,
        post_id: rows[0].post_id,
    };
});
exports.getExistingRating = getExistingRating;
const insertRating = (userId, postId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.query("INSERT INTO ratings (user_id, post_id, rating) VALUES (?, ?, ?)", [userId, postId, rating]);
});
exports.insertRating = insertRating;
const createRating = (rating) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, post_id, rating: ratingValue } = rating;
    yield db_1.db.query("INSERT INTO ratings (user_id, post_id, rating) VALUES (?, ?, ?)", [user_id, post_id, ratingValue]);
});
exports.createRating = createRating;
const updateRating = (ratingId, rating) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.query("UPDATE ratings SET rating = ? WHERE id = ?", [rating, ratingId]);
});
exports.updateRating = updateRating;
const getRatingByPostIdAndUserId = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT rating FROM ratings WHERE post_id = ? AND user_id = ?";
    const [rows] = yield db_1.db.query(query, [postId, userId]);
    if (rows.length > 0) {
        return rows[0].rating;
    }
    else {
        // If no rating was found, return null
        return null;
    }
});
exports.getRatingByPostIdAndUserId = getRatingByPostIdAndUserId;
const getRatingSummaryByPostId = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT AVG(rating) AS avgRating, COUNT(rating) AS numberOfRatings FROM ratings WHERE post_id = ?";
    const [rows] = yield db_1.db.query(query, [postId]);
    if (rows.length > 0 && rows[0].numberOfRatings > 0) {
        return {
            averageRating: rows[0].avgRating,
            numberOfRatings: rows[0].numberOfRatings
        };
    }
    else {
        // If no rating was found, return null for average and 0 for count
        return {
            averageRating: null,
            numberOfRatings: 0
        };
    }
});
exports.getRatingSummaryByPostId = getRatingSummaryByPostId;
//# sourceMappingURL=rating.service.js.map