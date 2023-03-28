const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const deleteContact = async (req, res, _) => {
  const { contactId } = req.params;
  const { id } = req.user;

  const contact = await Contact.findOneAndRemove({ owner: id, _id: contactId });
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

module.exports = deleteContact;
