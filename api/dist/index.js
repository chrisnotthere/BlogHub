"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("./config/middleware");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
(0, middleware_1.applyMiddleware)(app);
app.use(routes_1.default);
// Use Heroku's assigned port, or 5000 if running locally
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map