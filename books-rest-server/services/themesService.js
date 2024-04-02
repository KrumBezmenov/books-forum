const Themes = require("../models/Themes");
const User = require("../models/User");

exports.getOne = (themesId) => {
  return Themes.findById(themesId);
};

exports.getOneDetailed = (themesId) => {
  return Themes.findById(themesId).populate("owner");
};

exports.getAll = () => {
  return Themes.find();
};

exports.create = async (userId, themesData) => {
  const createdTheme = await Themes.create({
    owner: userId,
    ...themesData,
  });

  await User.findByIdAndUpdate(userId, {
    $push: { createdTheme: createdTheme._id },
  });

  return createdTheme;
};

exports.update = (themesId, themesData) => {
  return Themes.findByIdAndUpdate(themesId, themesData, {
    runValidators: true,
  });
};

exports.delete = (themesId) => {
  return Themes.findByIdAndDelete(themesId);
};

exports.search = (title) => {
  let query = {};

  if (title) {
    // query.name = name;
    query.title = new RegExp(title, "i");
  }

  return Themes.find(query);
};
