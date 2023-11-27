const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = getToken(req)
        if (!token) return res.status(403).json("Access denied.");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json("Invalid token");
    }
};

function getToken(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    } 
    return null;
}