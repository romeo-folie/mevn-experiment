const express = require("express");
const clientController = require("../controllers/client.controller");

const clientRouter = express.Router();

/**
 * @openapi
 * /clients:
 *  get:
 *    description: Get all clients
 *    responses:
 *      200:
 *        description: Returns all clients
 *      500:
 *        description: Failed to return clients
 *  post:
 *    description: Add new client
 *    parameters:
 *    - name: name
 *      description: Name of client
 *      type: string
 *      required: true
 *    - name: email
 *      description: Email of client
 *      type: string
 *      required: true
 *    - name: phone
 *      description: Phone number of client
 *      type: string
 *      required: true
 *    responses:
 *      201:
 *        description: Added new client
 *      500:
 *         description: Failed to add new client
 */
clientRouter.route("/").get(clientController.all).post(clientController.add);

clientRouter
  .route("/:id")
  .get(clientController.get)
  .put(clientController.update)
  .delete(clientController.delete);

module.exports = clientRouter;
