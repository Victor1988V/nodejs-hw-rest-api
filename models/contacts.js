const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateList(body) {
  return fs.writeFile(contactsPath, JSON.stringify(body, null, 2));
}

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  return contacts[index];
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  console.table(contacts);
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;
  const deleteContact = contacts.splice(index, 1);
  await updateList(contacts);
  return deleteContact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);

  await updateList(contacts);

  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts;

  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) return null;

  const updatedContact = {
    ...contacts[index],
    ...body,
  };
  contacts[index] = updatedContact;

  await updateList(contacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
