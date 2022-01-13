const express = require("express");
const providerController = require("../controllers/provider.controller");

const providerRouter = express.Router();

providerRouter
  .route("/")
  .get(providerController.all)
  .post(providerController.add);

providerRouter
  .route("/:id")
  .get(providerController.get)
  .put(providerController.update)
  .delete(providerController.delete);

module.exports = providerRouter;
