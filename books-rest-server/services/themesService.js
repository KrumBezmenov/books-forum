const Themes = require("../models/Themes");
const User = require("../models/User");

exports.getOne = (themesId) => {
  return Themes.findById(themesId);
};

exports.getOneDetailed = (themesId) => {
  return Themes.findById(themesId).populate("owner").populate("reviewedList");
};

// Get all Themes
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

exports.edit = (themesId, themesData) => {
  return Themes.findByIdAndUpdate(themesId, themesData, {
    runValidators: true,
  });
};

exports.delete = (themesId) => {
  return Themes.findByIdAndDelete(themesId);
};
