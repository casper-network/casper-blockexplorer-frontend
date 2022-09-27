import "mocha";
import { expect } from "chai";

import NodeManager from "./node-manager";

const listOfNodes = [
  "http://3.138.177.248:7777/rpc",
  "http://3.143.158.19:7777/rpc",
  "http://18.224.193.24:7777/rpc",
];

const nodeManager = new NodeManager(listOfNodes);

