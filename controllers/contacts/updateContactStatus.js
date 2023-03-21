const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const updateContactStatus = async (req, res, _) => {
  const { contactId } = req.params;
  const { id } = req.user;

  const contact = await Contact.findOneAndUpdate(
    { owner: id, _id: contactId },
    req.body,
    { new: true }
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(200).json(contact);
};

module.exports = updateContactStatus;
