var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var dishRouter = require("./routes/dishesRouter");
var promoRouter = require("./routes/promoRouter");
var leaderRouter = require("./routes/leaderRouter");
var userRouter = require("./routes/userRouter");
const passport = require("passport");
const authenticate = require("./authenticate");

var indexRouter = require("./routes/index");

var session = require('express-session');
var FileStore = require('session-file-store')(session);



const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/conFusion";
const connect = mongoose.connect(url);

connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);

var app = express();
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore({ logFn: function () { } })
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser('12345-67890'));

function auth(req, res, next) {
  console.log(req.session);
  if (req.originalUrl == '/users/login' || req.originalUrl == '/users/signup' || req.originalUrl == "/") {
    next();
  }
  else {
    if (!req.session.user) {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
    else {
      if (req.session.user === 'authenticated') {
        next();
      }
      else {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
      }
    }
  }
}


app.use(auth);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);
app.use('/users', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
