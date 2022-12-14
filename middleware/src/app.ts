import axios from "axios";
import cors from "cors";
import express from "express";
import { query } from "express-validator";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import { NODE_ENV, NODE_URLS } from "./config";
import { errorConverter, errorHandler, validate } from "./middlewares";
import NodeManager from "./node-manager";
import { fetchPeers } from "./services";
import openapiSpecification from "./swagger";

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(morgan("dev"));

const nodeManager = new NodeManager(NODE_URLS.split(","));

/**
 * @openapi
 * /health-check:
 *   get:
 *     description: Health check api
 *     responses:
 *       200:
 *         description: Returns "ok"
 */
app.get("/health-check", (_, res) => {
  res.status(200).json({ status: "ok" });
});

app.post("/rpc", (req, res) => {
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
 *         description: A list of users.
 *
 */
app.get(
  "/peers",
  validate([query("update").optional().isBoolean().toBoolean()]),
  async (req, res) => {
    const update = req.query.update as unknown as boolean | undefined;
    const result = await fetchPeers(update);
    res.json(result);
  }
);

if (NODE_ENV === "development")
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use(errorConverter);

app.use(errorHandler);

process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

export default app;
