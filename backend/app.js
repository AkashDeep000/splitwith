const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();
const AuthRoute = require("./routes/AuthRoute");
const GroupRoute = require("./routes/GroupRoute");
const InviteRoute = require("./routes/InviteRoute");
const UserRoute = require("./routes/UserRoute");

const { verifyAccessToken } = require("./helper/jwtHelper");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/auth", AuthRoute);
app.use("/invite", InviteRoute);
app.use("/group", verifyAccessToken, GroupRoute);
app.use("/user", verifyAccessToken, UserRoute);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
// module.exports = app
