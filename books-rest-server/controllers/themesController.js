const router = require("express").Router();

const themesService = require("../services/themesService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth } = require("../middlewares/authMiddeware");

router.get("/", async (req, res) => {
  const themes = await themesService.getAll().lean();

  res.end(JSON.stringify(themes), null, 2);
});

router.post("/create", isAuth, async (req, res) => {
  const themeData = req.body;
  try {
    await themesService.create(req.user._id, themeData);

    res.end(JSON.stringify(req.body, null, 2));
  } catch (err) {
    res.end(JSON.stringify(err));
  }
});
router.post("/:themesId/edit", isThemesOwner, async (req, res) => {
  const themesData = req.body;

  try {
    await themesService.edit(req.params.themesId, themesData);
    res.end(JSON.stringify(themesData, null, 2));
  } catch (err) {
    res.end(JSON.stringify(err));
  }
});

router.get("/:themesId/edit", isThemesOwner, async (req, res) => {
  const themesData = req.body;
  const editedTheme = await themesService.edit(req.params.themesId, themesData);
  res.end(JSON.stringify(editedTheme));
});

router.get("/:themesId/details", async (req, res) => {
  const themes = await themesService.getOneDetailed(req.params.themesId).lean();

  // const isOwner = themes.owner && themes.owner._id == req.user?._id;
  // const isReviewed = themes.reviewedList.some(user => user._id == req.user?._id);

  res.end(JSON.stringify(themes));
});

router.get("/:themesId/delete", isThemesOwner, async (req, res) => {
  const themes = await themesService.delete(req.params.themesId);
  // res.redirect('/books');
  res.end(JSON.stringify(themes));
});

async function isThemesOwner(req, res, next) {
  const themes = await themesService.getOne(req.params.themesId).lean();

  if (themes.owner != req.user?._id) {
    // return res.redirect(`/books/${req.params.booksId}/details`);
  }
  next();
}

module.exports = router;
