const express = require("express");
let users = require("../data/users");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", (req, res) => {
  //   console.log(req.body);
  const newUser = { id: users.length + 1, ...req.body };
  //   console.log(newUser);
  users.push(newUser);
  res.json(users);
});

router.get("/:id", (req, res) => {
  const user = users.find((user) => user.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports = router;
