import "mocha";
import { expect } from "chai";

import NodeManager from "./node-manager";

const listOfNodes = [
  "http://3.138.177.248:7777/rpc",
  "http://3.143.158.19:7777/rpc",
  "http://18.224.193.24:7777/rpc",
];

const nodeManager = new NodeManager(listOfNodes);

describe("NodeManager", () => {
  it("init with a valid list of nodes", () => {
    const expectedNodeAddresses = [
      { id: 0, url: listOfNodes[0], isDead: false },
      { id: 1, url: listOfNodes[1], isDead: false },
      { id: 2, url: listOfNodes[2], isDead: false },
    ];

    expect(nodeManager.nodeAddresses).to.be.deep.eq(expectedNodeAddresses);
  });
});
