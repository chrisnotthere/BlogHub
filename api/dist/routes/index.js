"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_routes_1 = __importDefault(require("./blog.routes"));
const rating_routes_1 = __importDefault(require("./rating.routes"));
const auth_routes_1 = __importDefault(require("./auth.routes"));
const comment_routes_1 = __importDefault(require("./comment.routes"));
const router = (0, express_1.Router)();
router.use("/posts", blog_routes_1.default);
router.use("/rating", rating_routes_1.default);
router.use('/comment', comment_routes_1.default);
router.use("/auth", auth_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map