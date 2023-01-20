import axios from "axios";
import express from "express";
import { query } from "express-validator";
import { StatusCodes } from "http-status-codes";
import swaggerUi from "swagger-ui-express";

import { NODE_ENV } from "../config";
import { errorConverter, errorHandler, validate } from "../middlewares";
import { fetchPeers, nodeManager } from "../services";
import openapiSpecification, { uiOptions } from "../swagger";
import { ApiError, catchAsync } from "../utils";
import onChainRoutes from "./on-chain";

const router = express.Router();

/**
 * @openapi
 * /health-check:
 *   get:
 *     description: Health check api
 *     responses:
 *       200:
 *         description: Returns "ok"
 */
router.get("/health-check", (_, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * @openapi
 * /rpc:
 *  post:
 *    description: Act as a rpc middleware
 */
router.use("/rpc", (req, res) => {
  const rpcCall = () => {
    const node = nodeManager.getActiveNode();

    // As JSON-RPC supports only POST methods we don't need to care here...
    axios
      .post(node.url, req.body)
      .then((nodeRes) => res.json(nodeRes.data))
      .catch(() => {
        nodeManager.setDeadNode(node.id);
        rpcCall();
      });
  };

  rpcCall();
});

/**
 * @openapi
 * /peers:
 *   get:
 *     description: Return peer related info.
 *     responses:
 *       200:
 *         description: A list of peers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     schema:
 *                     type: object
 *                     properties:
 *                       address:
 *                         type: string
 *                       isAlive:
 *                         type: boolean
 *                       uptime:
 *                         type: string
 *                       lastBlockHash:
 *                         type: string
 *       404:
 *         description: All peers are dead( the worst case and this will never happen )
 *
 */
router.get(
  "/peers",
  validate([query("update").optional().isBoolean().toBoolean()]),
  catchAsync(async (req, res) => {
    const update = req.query.update as unknown as boolean | undefined;
    const result = await fetchPeers(update);
    res.json({ result });
  })
);

router.use(onChainRoutes);

if (NODE_ENV === "development") {
  router.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(openapiSpecification, uiOptions)
  );
}

router.use((req, res, next) => {
  next(new ApiError(StatusCodes.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
router.use(errorConverter);

// handle error
router.use(errorHandler);

export default router;
