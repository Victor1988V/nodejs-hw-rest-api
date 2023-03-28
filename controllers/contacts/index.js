const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const createContact = require("./createContact");
const updateContact = require("./updateContact");
const updateContactStatus = require("./updateContactStatus");
const deleteContact = require("./deleteContact");

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  updateContactStatus,
  deleteContact,
};
