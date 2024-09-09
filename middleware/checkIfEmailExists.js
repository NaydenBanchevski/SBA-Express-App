const users = require("../data/users"); // Adjust the path as necessary

function checkIfEmailExists(req, res, next) {
  const { email } = req.body;

  const emailExists = users.some((user) => user.email === email);

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  next();
}

module.exports = checkIfEmailExists;
