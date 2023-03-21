const RequestError = require("../helpers/RequestError");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");

const auth = async (req, _, next) => {
  try {
    if (!req.headers.authorization) throw RequestError(401, "Not authorized");

    const [bearer, token] = req.headers.authorization.split(" ");
    if (bearer !== "Bearer") throw RequestError(401, "Not authorized");

    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) throw RequestError(401);

    req.user = user;

    next();
  } catch (err) {
    throw RequestError(401, "Please provide a valid token");
  }
};

module.exports = auth;
