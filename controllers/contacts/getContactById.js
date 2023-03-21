const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const getContactById = async (req, res, _) => {
  const { id } = req.user;
  const contact = await Contact.findOne({
    owner: id,
    _id: req.params.contactId,
  });

  if (!contact) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(contact);
};

module.exports = getContactById;
