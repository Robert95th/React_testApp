const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const User = require("./user");
//----------------------------------------- END OF IMPORTS---------------------------------------------------
mongoose.connect(
  "mongodb+srv://wamu:Wamu8250@wamustodos.d4yop.mongodb.net/WamusTodos?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongoose Is Connected");
  }
);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://172.16.48.240:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
app.use(express.static(__dirname + '/img'));
//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

// Routes
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log(req.user);
        res.send({ message: "Successfully Authenticated", data: req.user });
      });
    }
  })(req, res, next);
});
app.post("/register", (req, res) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      newUser.save();
      res.send("User Created");
    }
  });
});
app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.

});
app.post("/updateDetils", (req, res) => {
  // The req.user stores the entire user that has been authenticated inside of it.
  User.findOneAndUpdate({ _id: req.body._id }, { $set: { username: req.body.username, email: req.body.email } }, { new: true }, (err, doc) => {
    if (err) {
      res.send("Something wrong when updating data!");
    }

    res.send(doc);
  });


});
app.post("/updateList", (req, res) => {
  console.log(req.body.tasks)
  User.updateOne(
    { _id: req.body._id },
    { $set: { tasks: req.body.tasks } }, { upsert: true }).then((result, err) => {
      return res.status(200).json({ data: result, message: "Value Updated" });
    })
});
app.get('/logout', function (req, res) {
  req.logout();
  res.send("logged out");
});
//----------------------------------------- END OF ROUTES---------------------------------------------------
//Start Server
app.listen(4000, () => {
  console.log("Server Has Started");
});
