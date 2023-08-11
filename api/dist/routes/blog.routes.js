"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_controller_1 = require("../controllers/blog.controller");
const middleware_1 = require("../config/middleware");
const authMiddleware_1 = require("../controllers/authMiddleware");
const router = express_1.default.Router();
router.get("/allPosts", blog_controller_1.getAllPostsController);
router.get("/post/:id", blog_controller_1.getPostController);
router.post("/createPost", authMiddleware_1.authenticateJWT, middleware_1.upload.fields([{ name: "image", maxCount: 1 }]), blog_controller_1.createPostController);
router.put("/updatePost/:id", authMiddleware_1.authenticateJWT, middleware_1.upload.fields([{ name: "image", maxCount: 1 }]), blog_controller_1.updatePostController);
router.delete("/deletePost/:id", authMiddleware_1.authenticateJWT, blog_controller_1.deletePostController);
exports.default = router;
//# sourceMappingURL=blog.routes.js.map