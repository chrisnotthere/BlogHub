"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
const url_1 = require("url");
dotenv_1.default.config({ path: ".env.local" });
if (process.env.JAWSDB_URL) {
    const jawsDBUrl = new url_1.URL(process.env.JAWSDB_URL);
    process.env.DB_HOST = jawsDBUrl.hostname;
    process.env.DB_USER = jawsDBUrl.username;
    process.env.DB_PASSWORD = jawsDBUrl.password;
    process.env.DB_NAME = jawsDBUrl.pathname.substring(1);
}
exports.db = promise_1.default.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    database: process.env.DB_NAME || "bloghub",
    password: process.env.DB_PASSWORD,
});
//# sourceMappingURL=db.js.map