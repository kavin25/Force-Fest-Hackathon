const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const db = require("./config/keys").MongoURI;
const app = express();
const flash = require("connect-flash");
const PORT = process.env.PORT || 5000;
const session = require("express-session");
const passport = require("passport");

require("./config/passport")(passport);

// Connect to mongo
mongoose
  .connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => console.log("mongoDB Conntected..."))
  .catch((err) => console.log(err));

// Body Parser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Conntect Flash
app.use(flash());

// global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

app.get("/dashboard", require("./routes/index.js"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/html/main.html");
});

app.use("/about", function (req, res) {
  res.sendFile(__dirname + "/public/html/about.html");
});

app.use("/users", require("./routes/users"));

app.use(express.static("public"));

app.listen(PORT, console.log(`server started on ${PORT}`));
