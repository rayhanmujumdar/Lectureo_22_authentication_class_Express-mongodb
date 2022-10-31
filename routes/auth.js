const { registerController, logInController } = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", registerController);

router.post("/login", logInController);

module.exports = router;
