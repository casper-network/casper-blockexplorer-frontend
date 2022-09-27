import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

import NodeManager from "./node-manager";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

if (!process.env.NODE_URLS) {
  throw Error("Missing NODE_URLS env variable");
}

const nodeManager = new NodeManager(process.env.NODE_URLS.split(","));

// Routes
app.get("/health-check", (req: Request, res: Response) => {
  res.send("ok");
});

app.post("/rpc", (req: Request, res: Response) => {
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

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
