import express from "express";
import { query } from "express-validator";

import { SIDE_CAR_REST_URL } from "../config";
import { validate } from "../middlewares";
import { ExtendedSidecar } from "../services";
import { Sort } from "../types";
import { catchAsync } from "../utils";

const router = express.Router();
const sidecar = new ExtendedSidecar(SIDE_CAR_REST_URL);

router.get(
  "/latest-block",
  catchAsync(async (req, res) => {
    const latestBlock = await sidecar.getTheLatestBlock();
    res.json(latestBlock);
  })
);

router.get(
  "/block/:hashOrHeight",
  catchAsync(async (req, res) => {
    const { hashOrHeight } = req.params;
    const block = await sidecar.getBlock(hashOrHeight);
    res.json(block);
  })
);

router.get(
  "/blocks",
  validate([
    query("from").optional().isInt().toInt().withMessage("Invalid number"),
    query("count")
      .optional()
      .isInt()
      .toInt()
      .default(10)
      .withMessage("Invalid number"),
    query("sort_by").optional().isString(),
    query("order_by")
      .optional()
      .isString()
      .toUpperCase()
      .isIn(["ASC", "DESC"])
      .withMessage("Invalid order,possible asc,desc"),
  ]),
  catchAsync(async (req, res) => {
    const { from, count, sort_by, order_by } = req.query as unknown as {
      from?: number;
      count: number;
      sort_by?: string;
      order_by?: Sort;
    };

    const orderByHeight =
      sort_by && sort_by === "height" ? order_by : undefined;

    const result = await sidecar.getBlocks(from, count, orderByHeight);

    res.json(result);
  })
);

export default router;
