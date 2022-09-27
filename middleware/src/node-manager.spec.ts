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

  it("getActiveNode() returns first not-dead node address (1 of 3)", () => {
    expect(nodeManager.getActiveNode()).to.be.deep.eq({
      id: 0,
      url: listOfNodes[0],
      isDead: false,
    });
  });

  it("setDeadNode() sets first active node as a dead one", () => {
    const firstActive = nodeManager.getActiveNode();
    nodeManager.setDeadNode(firstActive.id);

    expect(nodeManager.nodeAddresses[0]).to.be.deep.eq({
      id: 0,
      url: listOfNodes[0],
      isDead: true,
    });

    expect(nodeManager.getActiveNode()).to.be.deep.eq({
      id: 1,
      url: listOfNodes[1],
      isDead: false,
    });
  });

});
