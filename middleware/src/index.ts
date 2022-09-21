import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

import nodeManager from "./rpc-manager";

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

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
      .catch((e) => {
        nodeManager.setDeadNode(node.id);
        rpcCall();
      });
  };

  rpcCall();
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
