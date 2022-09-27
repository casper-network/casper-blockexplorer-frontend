interface RpcListItem {
  id: number;
  url: string;
  isDead: boolean;
}

class NodeManager {
  public nodeAddresses: RpcListItem[] = [];

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

export default NodeManager;