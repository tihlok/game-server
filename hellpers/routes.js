const express = require("express");

class Routes {
  constructor () {
    this._router = express.Router();
  }

  get router () {
    return this._router;
  }

  get (route, action) {
    this._router.get(route, action);
    return this;
  }

  post (route, action) {
    this._router.post(route, action);
    return this;
  }
}

module.exports = Routes;
