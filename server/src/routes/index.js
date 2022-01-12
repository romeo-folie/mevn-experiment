import express from "express";
import clientRouter from "./client";
import providerRouter from "./provider";

const router = express.Router();

router.use("/clients", clientRouter);
router.use("/providers", providerRouter);

export default router;
