const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const app = express();
const flash = require("connect-flash");
const PORT = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");
const { ensureAuthenticated } = require("./config/auth");
const router = express.Router();
const Article = require("./models/article");
const methodOverride = require("method-override");

require("./config/passport")(passport);

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use("/dashboard", require("./routes/index.js"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/main.html");
});

app.use("/about", function (req, res) {
  res.sendFile(__dirname + "/public/html/about.html");
});

app.use("/users", require("./routes/users"));

app.use(express.static("public"));

app.listen(PORT, console.log(`server started on ${PORT}`));
