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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserById = exports.verifyJwtToken = exports.generateJwtToken = exports.validatePassword = exports.createUser = exports.findUserByUsername = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../config/db");
// Retrieve a user's information using their username
const findUserByUsername = (username) => __awaiter(void 0, void 0, void 0, function* () {
    const [users] = yield db_1.db.query("SELECT * FROM users WHERE username = ?", [username]);
    return users;
});
exports.findUserByUsername = findUserByUsername;
// Create a new user
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, role } = user;
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    yield db_1.db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)", [
        username, hashedPassword, role
    ]);
});
exports.createUser = createUser;
// Validate a user's password
const validatePassword = (password, hashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.compare(password, hashedPassword);
});
exports.validatePassword = validatePassword;
// Generate a JWT for a user
const generateJwtToken = (userId, secret) => {
    return jsonwebtoken_1.default.sign({ userId }, secret, { expiresIn: "1h" });
};
exports.generateJwtToken = generateJwtToken;
// Verify a JWT
const verifyJwtToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyJwtToken = verifyJwtToken;
// Retrieve a user's information using their id
const findUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [users] = yield db_1.db.query("SELECT * FROM users WHERE id = ?", [
        userId,
    ]);
    return users;
});
exports.findUserById = findUserById;
//# sourceMappingURL=auth.service.js.map