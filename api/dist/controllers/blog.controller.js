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
exports.getAllPosts = void 0;
const blog_service_1 = require("../services/blog.service");
const getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield (0, blog_service_1.fetchAllPosts)();
        res.send({ data: posts, message: 'from posts table' });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Something went wrong.', error: err });
    }
});
exports.getAllPosts = getAllPosts;
//# sourceMappingURL=blog.controller.js.map