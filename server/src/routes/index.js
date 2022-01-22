const express = require("express");
const {clientModel} = require("../models/client.model");
const {providerModel} = require("../models/provider.model");
const logger = require("../utils/logger");
const clientRouter = require("./client.routes");
const providerRouter = require("./provider.routes");

const router = express.Router();

/**
 * @openapi
 * /all:
 *  get:
 *    description: Get all resources
 *    responses:
 *      200:
 *        description: Returned all resources
 *      500:
 *        description: Failed to return resources
 *    tags:
 *      - all
 */
router.get("/all", async (req, res) => {
  try {
    const clients = await clientModel.getClients();
    const providers = await providerModel.getProviders();
    res.status(200).json({success: true, data: {clients, providers}});
  } catch (error) {
    logger.error("error fetching clients " + error.message);
    res.status(500).json({success: false, message: error.message});
  }
});

router.use("/clients", clientRouter);
router.use("/providers", providerRouter);

module.exports = router;
