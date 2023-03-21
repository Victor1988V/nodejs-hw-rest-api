const express = require("express");
const router = express.Router();
const ctrlWrapper = require("../../helpers/ctrlWrapper");
const ctrl = require("../../controllers/contacts");
const { validate } = require("../../middlewares/validateBody");
const { schema, statusSchema } = require("../../models/contact");
const auth = require("../../middlewares/authMiddleware");

router.use(auth);

router.get("/", ctrlWrapper(ctrl.getAllContacts));
router.get("/:contactId", ctrlWrapper(ctrl.getContactById));
router.post("/", validate(schema), ctrlWrapper(ctrl.createContact));
router.put("/:contactId", validate(schema), ctrlWrapper(ctrl.updateContact));
router.patch(
  "/:contactId/favorite",
  validate(statusSchema),
  ctrlWrapper(ctrl.updateContactStatus)
);
router.delete("/:contactId", ctrlWrapper(ctrl.deleteContact));

module.exports = router;
