const express = require("express");
const clientController = require("../controllers/client.controller");

const clientRouter = express.Router();

clientRouter.route("/").get(clientController.all).post(clientController.add);

clientRouter
  .route("/:id")
  .get(clientController.get)
  .put(clientController.update)
  .delete(clientController.delete);

module.exports = clientRouter;
