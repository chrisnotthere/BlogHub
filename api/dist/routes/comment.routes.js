"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const comment_controller_1 = require("../controllers/comment.controller");
const authMiddleware_1 = require("../controllers/authMiddleware");
const router = express_1.default.Router();
router.post("/create", authMiddleware_1.authenticateJWT, comment_controller_1.createCommentController);
router.get("/allComments/:postId", comment_controller_1.getAllCommentsController);
router.delete("/delete/:commentId", authMiddleware_1.authenticateJWT, comment_controller_1.deleteCommentController);
router.post("/likeToggle", authMiddleware_1.authenticateJWT, comment_controller_1.likeToggleController);
router.post("/checkIfUserLiked/", comment_controller_1.checkIfUserLikedController);
exports.default = router;
//# sourceMappingURL=comment.routes.js.map