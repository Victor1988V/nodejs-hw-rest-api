const { User } = require("../../models/user");

const updateSubscription = async (req, res, _) => {
  const { id } = req.user;
  const subscription = req.body;
  const user = await User.findByIdAndUpdate(id, subscription, { new: true });

  res.status(200).json({ subscription: user.subscription });
};

module.exports = updateSubscription;
