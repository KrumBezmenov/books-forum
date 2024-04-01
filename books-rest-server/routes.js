const router = require("express").Router();

const authController = require("./controllers/authController");
const themesController = require("./controllers/themesController");

router.use("/auth", authController);
router.use("/themes", themesController);

router.all("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = router;
