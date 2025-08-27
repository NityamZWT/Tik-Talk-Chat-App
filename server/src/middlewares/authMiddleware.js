const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    try {
        console.log("Auth middleware triggered", req.cookies);
        const token = req.cookies.jwt_token;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error in auth middleware:", error);
        res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = authMiddleware;