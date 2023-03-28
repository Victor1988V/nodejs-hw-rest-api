const RequestError = require("../../helpers/RequestError");
const sendMail = require("../../helpers/sendMail");
const { User } = require("../../models/user");
const createHTML = require("../../helpers/verificationHTML");

const { BASE_URL } = process.env;

const resendVerification = async (req, res, _) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw RequestError(404, "User not found");

  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }

  const mail = {
    to: email,
    subject: "Verify your email address",
    text: `Verify your email by this link: ${BASE_URL}/api/users/verify/${user.verificationToken}`,
    html: createHTML(email, BASE_URL, user.verificationToken),
  };

  await sendMail(mail);

  res.status(200).json({ message: "Email sent successfully" });
};

module.exports = resendVerification;
