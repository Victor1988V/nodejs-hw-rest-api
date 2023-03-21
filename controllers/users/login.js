const { User } = require("../../models/user");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const login = async (req, res, _) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw RequestError(401, "Email or password is wrong");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) throw RequestError(401, "Email or password is wrong");

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = login;
