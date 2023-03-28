const { Contact } = require("../../models/contact");
const RequestError = require("../../helpers/RequestError");

const createContact = async (req, res, _) => {
  const { id } = req.user;
  const contact = await Contact.create({ ...req.body, owner: id });

  if (!contact) {
    throw RequestError(404, "Not found");
  }

  res.status(201).json(contact);
};

module.exports = createContact;
