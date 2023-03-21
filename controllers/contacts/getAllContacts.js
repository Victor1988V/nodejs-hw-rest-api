const { Contact } = require("../../models/contact");

const getAllContacts = async (req, res, _) => {
  const { id } = req.user;

  let { page = 1, limit = 20, favorite } = req.query;

  limit = +limit > 20 ? 20 : +limit;
  const skip = +page > 1 ? +limit * (+page - 1) : 0;

  let sortByFavorite;
  switch (favorite) {
    case "true":
      sortByFavorite = { favorite: -1 };
      break;
    case "false":
      sortByFavorite = { favorite: 1 };
      break;
    default:
      sortByFavorite = {};
      break;
  }

  const contacts = await Contact.find({ owner: id })
    .skip(skip)
    .limit(limit)
    .sort(sortByFavorite);

  res.status(200).json({ contacts, page: +page, limit });
};

module.exports = getAllContacts;
