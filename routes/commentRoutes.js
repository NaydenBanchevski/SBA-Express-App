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

module.exports = router;
