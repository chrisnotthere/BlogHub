"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = exports.upload = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = __importDefault(require("multer"));
// set images folder as destination for multer
exports.upload = (0, multer_1.default)({ dest: "images/" });
const applyMiddleware = (app) => {
    app.use((0, cors_1.default)({
        origin: ["http://localhost:3000", "https://chrisnotthere.github.io"],
        credentials: true, // server accepts cookies from the client
    }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use("/images", express_1.default.static("images")); // serve images from images folder
};
exports.applyMiddleware = applyMiddleware;
//# sourceMappingURL=middleware.js.map