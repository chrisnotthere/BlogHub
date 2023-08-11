"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../../.env.local' });
exports.users = [
    {
        username: 'guestUser',
        password: process.env.GUEST_PASSWORD,
        role: 'writer',
    },
    {
        username: 'guestAdmin',
        password: process.env.GUEST_ADMIN_PASSWORD,
        role: 'admin',
    },
    {
        username: 'johnDoe',
        password: 'password123',
        role: 'member',
    },
    {
        username: 'janeSmith',
        password: 'janePass456',
        role: 'writer',
    },
    {
        username: 'michaelBrown',
        password: 'mikeB789',
        role: 'admin',
    },
    {
        username: 'sarahJohnson',
        password: 'sarahJ111',
        role: 'writer',
    },
    {
        username: 'williamLee',
        password: 'williamL222',
        role: 'member',
    },
    {
        username: 'emmaDavis',
        password: 'emmaD333',
        role: 'admin',
    },
];
//# sourceMappingURL=populateUsers.js.map