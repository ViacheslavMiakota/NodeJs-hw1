const path = require("path");
const fs = require("fs").promises;
const nanoid = require("nanoid");

const contactsPath = path.join("./db/contacts.json");

async function listContacts() {
  const readContacts = await fs.readFile(
    contactsPath,
    "utf-8"
  );
  const contacts = JSON.parse(readContacts);
  return contacts;
}

async function getContactById(id) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === id
  );
  return contact;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const contactRemove = contacts.filter(
    (contact) => contact.id !== id
  );
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactRemove, null, 2)
  );
}

async function addContact(id, name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
