const express = require("express");
let users = require("../data/users");
let posts = require("../data/posts");
let comments = require("../data/comments");
const ifEmailExists = require("../middleware/checkIfEmailExists");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(users);
});

router.post("/", ifEmailExists, (req, res) => {
  //   console.log(req.body);
  const newUser = {
    id: users.length + Math.floor(Math.random(users.length + 50) * 50),
    ...req.body,
  };
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

router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userExists = users.some((user) => user.id === userId);

  if (userExists) {
    users = users.filter((user) => user.id !== userId);
    res.redirect("/"); // Redirect to the home page
  } else {
    res.status(404).json({ message: `User with ID ${userId} not found` });
  }
});

router.get("/:id/activity", (req, res) => {
  const userId = parseInt(req.params.id);

  const user = users.find((user) => user.id === userId);
  if (!user) {
    return res
      .status(404)
      .json({ message: `User with ID ${userId} not found` });
  }

  const userPosts = posts.filter((post) => post.authorId === userId);
  const userComments = comments.filter((comment) => comment.userId === userId);

  const postsWithComments = userPosts.map((post) => ({
    ...post,
    comments: userComments.filter((comment) => comment.postId === post.id),
  }));

  const singleComments = userComments.filter(
    (comment) => !postsWithComments.some((post) => post.id === comment.postId)
  );

  res.render("userDetails", {
    user,
    postsWithComments,
    singleComments,
  });
});

module.exports = router;
