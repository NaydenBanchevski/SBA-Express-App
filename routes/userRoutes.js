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

router.get("/:id/posts", (req, res) => {
  const userId = parseInt(req.params.id);
  const userPosts = posts.filter((post) => post.authorId === userId);
  if (userPosts.length > 0) {
    res.json(userPosts);
  } else {
    res
      .status(404)
      .json({ message: `No posts found for user with ID ${userId}` });
  }
});

router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.map((user) =>
    user.id === userId ? { ...user, ...req.body } : user
  );
  const updatedUser = users.find((user) => user.id === userId);
  if (updatedUser) {
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});

module.exports = router;
