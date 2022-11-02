const { registerController, logInController } = require("../controllers/auth");

const router = require("express").Router();

/**
 * create a new authentication user
 * @api api/v1/register
 * @apiDescription create a new user by name,email,password,roles,accountStatus or etc input
 * @visibility Public
 * @method POST
 */
router.post("/register", registerController);

/**
 * authentication login
 * @api api/v1/login
 * @apiDescription email or password to authenticate user
 * @visibility Public
 * @method POST
 */

router.post("/login", logInController);

module.exports = router;
