const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token =
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
      ? req.headers.authorization.split(" ")[1]
      : req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decodedToken;
    next();
  } catch (error) {
    res.status(401).send({
      error: "Invalid Token!",
    });
  }
};

const protectRoute = (req, res, next) => {
  if (req.decoded) {
    return next();
  }

  res.status(401).send({
    error: "Not Authorized!",
  });
};

module.exports = { verifyToken, protectRoute };
