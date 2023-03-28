const { User } = require("../../models/user");
const RequestError = require("../../helpers/RequestError");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");
const sendMail = require("../../helpers/sendMail");
const createHTML = require("../../helpers/verificationHTML");

const { BASE_URL } = process.env;

const registration = async (req, res, _) => {
  const { email, password } = req.body;

  const isUserExist = await User.findOne({ email });
  if (isUserExist) throw RequestError(409, "Email in use");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const user = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Verify your email address",
    text: `Verify your email by this link: ${BASE_URL}/api/users/verify/${verificationToken}`,
    html: createHTML(email, BASE_URL, verificationToken),
  };

  await sendMail(mail);

  res.status(201).json({
    email: user.email,
    subscription: user.subscription,
  });
};

module.exports = registration;
