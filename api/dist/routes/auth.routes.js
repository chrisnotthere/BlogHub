"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authMiddleware_1 = require("../controllers/authMiddleware");
const router = express_1.default.Router();
router.post("/register", auth_controller_1.registerUserController);
router.post("/login", auth_controller_1.loginUserController);
router.post("/logout", authMiddleware_1.authenticateJWT, auth_controller_1.logoutUserController);
router.get("/user", authMiddleware_1.authenticateJWT, auth_controller_1.getUserController);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map