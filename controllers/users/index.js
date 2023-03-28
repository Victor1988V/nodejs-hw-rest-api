const registration = require("./registration");
const login = require("./login");
const logout = require("./logout");
const current = require("./current");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verification = require("./verification");
const resendVerification = require("./resendVerification");

module.exports = {
  registration,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verification,
  resendVerification,
};
