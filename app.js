const express = require("express");
const logger = require("morgan");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router = require("./router");
router(app);

module.exports = app;
