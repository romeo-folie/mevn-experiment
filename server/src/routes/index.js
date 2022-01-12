const express = require("express");
const clientRouter = require("./client.routes");
const providerRouter = require("./provider.routes");

const router = express.Router();

router.use("/clients", clientRouter);
router.use("/providers", providerRouter);

module.exports = router;
