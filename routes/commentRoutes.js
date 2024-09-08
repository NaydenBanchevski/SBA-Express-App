const express = require("express");
let comments = require("../data/comments");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(comments);
});
module.exports = router;
