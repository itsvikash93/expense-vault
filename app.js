const express = require("express");
const app = express();
const serverless = require("serverless-http"); // 🔥

const path = require("path");
const mongooseConnection = require("./config/mongoose");
const expressSession = require("express-session");
const methodOverride = require("method-override");
const flash = require("connect-flash");

require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(flash());

// Routers
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const hisaabRouter = require("./routes/hisaab");

app.use("/", indexRouter);
app.use("/", userRouter);
app.use("/hisaab", hisaabRouter);

// Don't use app.listen()
// Export for Vercel
module.exports = app;
module.exports.handler = serverless(app);

// app.listen(process.env.PORT || 3000);
