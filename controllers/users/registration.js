const { User } = require("../../models/user");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const registration = async (req, res, _) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) throw RequestError(409, "Email in use");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email);
  console.log(avatarURL);

  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = registration;
