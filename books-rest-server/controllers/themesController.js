const router = require("express").Router();

const themesService = require("../services/themesService");
const { getErrorMessage } = require("../utils/errorUtils");
const { isAuth } = require("../middlewares/authMiddeware");

router.get("/", async (req, res) => {
  const themes = await themesService.getAll().lean();
  res.json(themes);
});

router.post("/create", isAuth, async (req, res) => {
  const themesData = req.body;
  try {
    if (!req.user) {
      throw new Error("Unauthorized");
    }
    await themesService.create(req.user._id, themesData);
    res.json(req.body);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/:themesId/edit", isAuth, isThemesOwner, async (req, res) => {
  const themesData = req.body;

  try {
    const editedTheme = await themesService.update(
      req.params.themesId,
      themesData
    );
    res.json(editedTheme);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.post("/:themesId/update", isAuth, isThemesOwner, async (req, res) => {
  const themesData = req.body;

  try {
    const editedTheme = await themesService.update(
      req.params.themesId,
      themesData
    );
    res.json(editedTheme);
  } catch (err) {
    res.status(404).json({ error: getErrorMessage(err) });
  }
});

router.get("/:themesId/details", async (req, res) => {
  const themes = await themesService.getOneDetailed(req.params.themesId).lean();
  const isOwner = themes.owner && themes.owner._id == req.user?._id;

  res.json({ ...themes, isOwner });
});

router.get("/:themesId/delete", isAuth, isThemesOwner, async (req, res) => {
  const themes = await themesService.delete(req.params.themesId);
  res.json(themes);
});

router.get("/search", async (req, res) => {
  const query = req.query.q;
  const data = await themesService.search(query);
  res.json(data);
});

async function isThemesOwner(req, res, next) {
  const themes = await themesService.getOneDetailed(req.params.themesId).lean();

  if (themes?.owner?._id != req.user?._id) {
    return res.status(401).json({ error: "Unauthorized owner" });
  }
  next();
}

module.exports = router;
