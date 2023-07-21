"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const applyMiddleware = (app) => {
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
};
exports.applyMiddleware = applyMiddleware;
//# sourceMappingURL=middleware.js.map