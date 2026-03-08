const authService = require("./auth.service");

const signup = async (req, res) => {
  try {
    const result = await authService.signup(req.body);

    res.status(201).json(result);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {

    const result = await authService.login(req.body);

    res.json(result);

  } catch (error) {

    res.status(401).json({ error: error.message });

  }
};

const me = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  signup,
  login,
  me
};