interface RpcListItem {
  id: number;
  url: string;
  isDead: boolean;
}

class NodeManager {
  private nodeAddresses: RpcListItem[] = [];

  constructor(listOfRpcs: string[]) {
    this.nodeAddresses = listOfRpcs.map((url, id) => ({
      id,
      url,
      isDead: false,
    }));
  }

  getActiveNode(): RpcListItem {
    const activeNode = this.nodeAddresses.find((n) => !n.isDead);

    if (!activeNode) {
      throw Error("All provided nodes are dead");
    }

    return activeNode;
  }

  setDeadNode(selectedId: number): void {
    this.nodeAddresses = this.nodeAddresses.map((item) =>
      item.id === selectedId ? { ...item, isDead: true } : item
    );
  }
}

console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);
console.log(process.env.NODE_URLS);

if (!process.env.NODE_URLS) {
  throw Error("Missing NODE_URLS env variable");
}

export default new NodeManager(process.env.NODE_URLS.split(","));
