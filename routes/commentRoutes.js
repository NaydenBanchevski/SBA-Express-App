const express = require("express");
let comments = require("../data/comments");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(comments);
});

router.post("/", (req, res) => {
  const newComment = { id: comments.length + 1, ...req.body };
  comments.push(newComment);
  res.status(201).json(newComment);
});

router.put("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  comments = comments.map((comment) =>
    comment.id === commentId ? { ...comment, ...req.body } : comment
  );
  res.json(comments.find((comment) => comment.id === commentId));
});

router.delete("/:id", (req, res) => {
  const commentId = parseInt(req.params.id);
  comments = comments.filter((comment) => comment.id !== commentId);
  res.status(204).send();
});

// get comments by user id
router.get("/user/:userId", (req, res) => {
  const userId = parseInt(req.params.userId);
  console.log(userId);

  const userComments = comments.filter((comment) => comment.userId === userId);
  console.log(userComments);

  if (userComments.length > 0) {
    res.json(userComments);
  } else {
    res
      .status(404)
      .json({ message: `No comments found for user with ID ${userId}` });
  }
});

router.get("/post/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const postComments = comments.filter((comment) => comment.postId === postId);
  if (postComments.length > 0) {
    res.json(postComments);
  } else {
    res
      .status(404)
      .json({ message: `No comments found for post with ID ${postId}` });
  }
});

module.exports = router;
