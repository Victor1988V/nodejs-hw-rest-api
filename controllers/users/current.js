const { User } = require("../../models/user");

const current = async (req, res, _) => {
  const { id } = req.user;
  const { email, subscription } = await User.findById(id);
  res.status(200).json({ email, subscription });
};

module.exports = current;
