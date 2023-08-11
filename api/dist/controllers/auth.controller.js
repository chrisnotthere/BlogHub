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
exports.getUserController = exports.logoutUserController = exports.loginUserController = exports.registerUserController = void 0;
const auth_service_1 = require("../services/auth.service");
// Register a new user, storing their username, hashed password, and role
const registerUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
        return res
            .status(400)
            .json({ message: "Username, password, and role are required." });
    }
    try {
        const users = yield (0, auth_service_1.findUserByUsername)(username);
        if (users.length > 0) {
            return res.status(400).json({ message: "Username already exists." });
        }
        let newUser = { username, password, role };
        yield (0, auth_service_1.createUser)(newUser);
        res.json({ message: "User registered successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.registerUserController = registerUserController;
// Log in a user, creating a new JWT for them
const loginUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res
            .status(400)
            .json({ message: "Username and password are required." });
    }
    try {
        const [user] = yield (0, auth_service_1.findUserByUsername)(username);
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password." });
        }
        const match = yield (0, auth_service_1.validatePassword)(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Invalid username or password." });
        }
        const secret = process.env.JWT_SECRET;
        const token = (0, auth_service_1.generateJwtToken)(user.id, secret);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: true,
            maxAge: 3600000,
        });
        const userResponse = {
            username: user.username,
            role: user.role,
            user_id: user.id,
        };
        res.json({ message: "User logged in successfully.", user: userResponse });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.loginUserController = loginUserController;
// Log out a user by clearing their JWT from the cookie
const logoutUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        res.json({ message: "User logged out successfully." });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.logoutUserController = logoutUserController;
// Retrieve a user's information using their JWT
const getUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("getUser")
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated." });
        }
        const secret = process.env.JWT_SECRET;
        let userId;
        try {
            const decoded = (0, auth_service_1.verifyJwtToken)(token, secret);
            userId = decoded.userId;
        }
        catch (error) {
            return res.status(403).json({ message: "Invalid token." });
        }
        const users = yield (0, auth_service_1.findUserById)(userId);
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found." });
        }
        const user = users[0];
        // console.log(user)
        res.json({ username: user.username, role: user.role, user_id: user.id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error." });
    }
});
exports.getUserController = getUserController;
//# sourceMappingURL=auth.controller.js.map