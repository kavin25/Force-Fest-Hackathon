const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const User = require("../models/User");
const Note = require("../models/Note");
const Article = require("./../models/article");
const articleRouter = require("./articles");

router.get("/vaccination", ensureAuthenticated, (req, res) => {
  res.render("api", {
    data: req,
  });
});

router.get("/transport", ensureAuthenticated, (req, res) => {
  res.render("transport", {
    data: req,
  });
});

router.get("/schedule", ensureAuthenticated, (req, res) => {
  Note.find({ title: req.user.name }).then((data1) => {
    res.render("notification", {
      data: req,
      data1: data1,
    });
  });
});

router.get("/", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    data: req,
  });
});

router.post("/schedule", ensureAuthenticated, (req, res) => {
  const { title, textOp, time } = req.body;
  const newNote = new Note({
    title,
    textOp,
    time,
  });
  newNote.save();
  res.redirect("/dashboard/schedule");
});

router.delete("/schedule/:id", async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.redirect("/dashboard/schedule");
});

router.get("/articles", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

router.use("/articles", articleRouter);

module.exports = router;
