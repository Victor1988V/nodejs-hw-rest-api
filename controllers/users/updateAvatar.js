const { User } = require("../../models/user");
const fs = require("fs/promises");
const path = require("path");
const { jimpOptimization } = require("../../helpers/imageManipulation");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, _) => {
  const { id } = req.user;
  const { path: tempName, originalname } = req.file;

  const extention = originalname.split(".").pop();
  const filename = `${id}.${extention}`;

  const resultName = path.join(avatarsDir, filename);

  await fs.rename(tempName, resultName);
  jimpOptimization(resultName);
  const avatarURL = path.join("avatars", filename);
  console.log(avatarURL);

  await User.findByIdAndUpdate(id, { avatarURL });

  res.status(200).json({ avatarURL: avatarURL });
};

module.exports = updateAvatar;
