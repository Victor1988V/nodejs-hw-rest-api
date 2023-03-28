const { User } = require("../../models/user");

const logout = async (req, res, _) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: "" });
  res.status(204).json("Logout successful");
};

module.exports = logout;
