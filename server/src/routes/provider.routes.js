const express = require("express");

const providerRouter = express.Router();

// one to edit client
// crud for providers
providerRouter.get("/", function (req, res) {
  // serve list of all providers
});

module.exports = providerRouter;
