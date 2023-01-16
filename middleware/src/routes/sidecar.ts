import express from "express";

import { SIDE_CAR_REST_URL } from "../config";
import { ExtendedSidecar } from "../services";

const router = express.Router();
const sidecar = new ExtendedSidecar(SIDE_CAR_REST_URL);

router.get("/latest-block", async (req, res) => {
  const latestBlock = await sidecar.getTheLatestBlock();
  res.json(latestBlock);
});

router.get("/block/:hashOrHeight", async (req, res) => {
  const { hashOrHeight } = req.params;
  const block = await sidecar.getBlock(hashOrHeight);
  res.json(block);
});

export default router;
