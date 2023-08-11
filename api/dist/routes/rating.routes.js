"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rating_controller_1 = require("../controllers/rating.controller");
const authMiddleware_1 = require("../controllers/authMiddleware");
const router = express_1.default.Router();
router.get("/ratingSummary/:postId", rating_controller_1.getRatingSummaryByPostIdController);
router.get("/:postId/:userId", rating_controller_1.getRatingByPostIdAndUserIdController);
router.post("/", authMiddleware_1.authenticateJWT, rating_controller_1.upsertRatingController);
exports.default = router;
//# sourceMappingURL=rating.routes.js.map