const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/users");
const { validate } = require("../../middlewares/validateBody");
const {
  loginSchema,
  registerSchema,
  subscriptionSchema,
} = require("../../models/user");
const auth = require("../../middlewares/authMiddleware");
const upload = require("../../middlewares/uploadMiddleware");

router.post(
  "/register",
  validate(registerSchema),
  ctrlWrapper(ctrl.registration)
);
router.post("/login", validate(loginSchema), ctrlWrapper(ctrl.login));
router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.get("/current", auth, ctrlWrapper(ctrl.current));
router.patch(
  "/",
  auth,
  validate(subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscription)
);
router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatar)
);

module.exports = router;
