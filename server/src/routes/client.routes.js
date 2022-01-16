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
 *        description: Returned all clients
 *      500:
 *        description: Failed to return clients
 *    tags:
 *      - clients
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
 *    tags:
 *      - clients
 */
clientRouter.route("/").get(clientController.all).post(clientController.add);

/**
 * @openapi
 * /clients/{id}:
 *  get:
 *    description: Get single client
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of client to get
 *    responses:
 *      200:
 *        description: Found client
 *      404:
 *        description: Client not found
 *      500:
 *        description: Error finding client
 *    tags:
 *      - clients
 *  put:
 *    description: Update single client
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of client to update
 *      - name: name
 *        description: updated name of client
 *        type: string
 *        required: true
 *      - name: email
 *        description: Email of client
 *        type: string
 *        required: true
 *      - name: phone
 *        description: Phone number of client
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Updated client
 *      404:
 *        description: Failed to find client to update
 *      500:
 *        description: Error updating client
 *    tags:
 *      - clients
 *  delete:
 *    description: Delete single client
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of client to delete
 *    responses:
 *      200:
 *        description: Deleted client
 *      404:
 *        description: Failed to find client to delete
 *      500:
 *        description: Error deleting client
 *    tags:
 *      - clients
 */
clientRouter
  .route("/:id")
  .get(clientController.get)
  .put(clientController.update)
  .delete(clientController.delete);

module.exports = clientRouter;
