const { registerService, loginService } = require("../service/auth");
exports.registerController = async (req, res, next) => {
  /**
   * Request input sources:
   * - req body
   * - req params
   * - req header
   * - req cookies
   */
  const { name, email, password } = req?.body;
  // validation check
  if (!name || !email || !password) {
    return res.status(400).json({ message: "invalid" });
  }
  try {
    // exec() use to if you find any error in your function
    const user = await registerService({ name, email, password });
    res.status(201).json({ message: "user created successfully", user });
  } catch (e) {
    console.log(e)
    next(e);
  }
};
exports.logInController = async (req, res, next) => {
  /* 
      email = input
      password = input
      user = find user with email
      if user not found
      return 400 error
      if password not equal to user.hash
      return 400 error 
      token = generate token using user
      return token
      end
    */

  const { email, password } = req.body;
  try {
    const token = await loginService({ email, password });
    res.status(201).json({
      message: "success",
      token,
    });
  } catch (e) {
    console.log(e);
    next(e);
  }
};
