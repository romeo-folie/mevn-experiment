const express = require("express");
const providerController = require("../controllers/provider.controller");

const providerRouter = express.Router();

/**
 * @openapi
 * /providers:
 *  get:
 *    description: Get all providers
 *    responses:
 *      200:
 *        description: Returned all providers
 *      500:
 *        description: Failed to return providers
 *    tags:
 *      - providers
 *  post:
 *    description: Add new provider
 *    parameters:
 *    - name: name
 *      description: Name of provider
 *      type: string
 *      required: true
 *    responses:
 *      201:
 *        description: Added new provider
 *      500:
 *        description: Failed to add new provider
 *    tags:
 *      - providers
 */
providerRouter
  .route("/")
  .get(providerController.all)
  .post(providerController.add);

/**
 * @openapi
 * /providers/{id}:
 *  get:
 *    description: Get single provider
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of provider to get
 *    responses:
 *      200:
 *        description: Found provider
 *      404:
 *        description: Provider not found
 *      500:
 *        description: Error finding provider
 *    tags:
 *      - providers
 *  put:
 *    description: Update single provider
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of provider to update
 *      - name: name
 *        description: Updated name of provider
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Updated provider
 *      404:
 *        description: Failed to find provider to update
 *      500:
 *        description: Error updating provider
 *    tags:
 *      - providers
 *  delete:
 *    description: Delete single provider
 *    parameters:
 *      - in: path
 *        name: id
 *        type: string
 *        required: true
 *        description: ID of provider to delete
 *    responses:
 *      200:
 *        description: Deleted provider
 *      404:
 *        description: Failed to find provider to delete
 *      500:
 *        description: Error deleting provider
 *    tags:
 *      - providers
 */
providerRouter
  .route("/:id")
  .get(providerController.get)
  .put(providerController.update)
  .delete(providerController.delete);

module.exports = providerRouter;
