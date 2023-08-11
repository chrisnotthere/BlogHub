"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const auth_service_1 = require("../services/auth.service");
const authenticateJWT = (req, res, next) => {
    // console.log('authenticateJWT middleware')
    const token = req.cookies.token;
    // console.log('token from request: ', token)
    if (token) {
        const secret = process.env.JWT_SECRET;
        try {
            const decoded = (0, auth_service_1.verifyJwtToken)(token, secret);
            req.user = decoded;
            next();
        }
        catch (e) {
            return res.status(403).json({ message: "Invalid token." });
        }
    }
    else {
        return res.status(401).json({ message: "Not authenticated." });
    }
};
exports.authenticateJWT = authenticateJWT;
//# sourceMappingURL=authMiddleware.js.map