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
exports.getRatingSummaryByPostIdController = exports.getRatingByPostIdAndUserIdController = exports.upsertRatingController = void 0;
const rating_service_1 = require("../services/rating.service");
const upsertRatingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { postId, userId, rating } = req.body;
    try {
        const existingRating = yield (0, rating_service_1.getExistingRating)(userId, postId);
        if (existingRating) {
            // If rating exists, update it
            yield (0, rating_service_1.updateRating)(existingRating.id, rating);
            res.send({ message: "Rating updated successfully" });
        }
        else {
            // If rating does not exist, insert it
            yield (0, rating_service_1.insertRating)(userId, postId, rating);
            res.send({ message: "Rating posted successfully" });
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was an error processing your request" });
    }
});
exports.upsertRatingController = upsertRatingController;
const getRatingByPostIdAndUserIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.params.userId);
    // Check if postId and userId are valid numbers
    if (isNaN(postId) || isNaN(userId)) {
        res.status(400).send({ message: "Invalid post ID or user ID" });
        return;
    }
    // Proceed with the database query if both postId and userId are valid
    try {
        const rating = yield (0, rating_service_1.getRatingByPostIdAndUserId)(postId, userId);
        res.send({ data: rating });
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was an error processing your request" });
    }
});
exports.getRatingByPostIdAndUserIdController = getRatingByPostIdAndUserIdController;
const getRatingSummaryByPostIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = Number(req.params.postId);
    try {
        const avgRating = yield (0, rating_service_1.getRatingSummaryByPostId)(postId);
        if (avgRating !== null) {
            res.send({ data: avgRating });
        }
        else {
            res.status(404).send({ message: "No ratings found for this post" });
        }
    }
    catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was an error processing your request" });
    }
});
exports.getRatingSummaryByPostIdController = getRatingSummaryByPostIdController;
//# sourceMappingURL=rating.controller.js.map