/* Binary Search Tree */
// basic functions : root, add, remove, min, max, find, parent, isPresent, reverse
// hight functions : minHeight, maxHeight, isBalanced
// traversal functions : inOrder, preOrder, postOrder, levelOrder, levelOrder

class Node {
  data: number;
  left: Node | null;
  right: Node | null;
  constructor(data: number, left: Node | null = null, right: Node | null = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

export class BinarySearchTree {
  #root: Node | null;

  constructor(arr: number[] = []) {
    if (arr.length) {
      const newBts = new BinarySearchTree();
      arr.forEach((element) => newBts.add(element));
      this.#root = newBts.root();
    } else {
      this.#root = null;
    }
  }

  root() {
    return this.#root;
  }

  add(data: number) {
    const node = this.#root;
    if (!node) {
      this.#root = new Node(data);
    } else {
      const search_and_add = (node: Node): BinarySearchTree => {
        if (data < node.data) {
          if (node.left) {
            return search_and_add(node.left);
          } else {
            node.left = new Node(data);
            return this;
          }
        } else if (data > node.data) {
          if (node.right) {
            return search_and_add(node.right);
          } else {
            node.right = new Node(data);
            return this;
          }
        } else {
          return this;
        }
      };

      return search_and_add(node);
    }
    return this;
  }

  remove(data: number) {
    if (!this.isPresent(data)) return false;
    const removeNode = (node: Node | null, data: number): Node | null => {
      if (!node) return null;
      if (data === node.data) {
        // node has no children
        if (!(node.left && node.right)) {
          return null;
        }
        // node has no right children
        if (!node.right) {
          return node.left;
        }
        // node has no left children
        if (!node.left) {
          return node.right;
        }

        // node has two children
        const minNode = this.find(this.min(node.right)!)!;
        node.data = minNode.data;
        node.right = removeNode(node.right, minNode.data);
        return node;
      } else if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      } else {
        node.right = removeNode(node.right, data);
        return node;
      }
    };

    this.#root = removeNode(this.#root, data);
    return true;
  }

  find(data: number) {
    const node = this.#root;
    let currentNode: Node | null = node;
    while (currentNode && currentNode.data !== data) {
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return currentNode;
  }

  parent(data: number) {
    if (!this.find(data)) return null;
    const node = this.#root;
    let parentNode: Node | null = null;
    let currentNode: Node | null = node;
    while (currentNode && currentNode.data !== data) {
      parentNode = currentNode;
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return parentNode;
  }

  isPresent(data: number) {
    const node = this.#root;
    let currentNode: Node | null = node;
    while (currentNode) {
      if (data === currentNode.data) {
        return true;
      }
      if (data < currentNode.data) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  min(otherNode: Node | null = this.#root) {
    let currentNode = otherNode;
    while (currentNode?.left) {
      currentNode = currentNode.left;
    }
    return currentNode?.data;
  }

  max(otherNode: Node | null = this.#root) {
    let currentNode = otherNode;
    while (currentNode?.right) {
      currentNode = currentNode.right;
    }
    return currentNode?.data;
  }

  minHeight(node: Node | null = this.#root): number {
    if (!node) return -1;

    const left = this.minHeight(node.left);
    const right = this.minHeight(node.right);

    return left < right ? left + 1 : right + 1;
  }

  maxHeight(node: Node | null = this.#root): number {
    if (!node) return -1;

    const left = this.maxHeight(node.left);
    const right = this.maxHeight(node.right);

    return left > right ? left + 1 : right + 1;
  }

  isBalanced(node: Node | null = this.#root) {
    return this.maxHeight(node) - this.minHeight(node) <= 1;
  }

  // return number in sorted. searched from left most node and then right most node
  inOrder(node: Node | null = this.#root) {
    if (!node) return null;
    const result: number[] = [];
    const traversal = (node: Node) => {
      node.left && traversal(node.left);
      result.push(node.data);
      node.right && traversal(node.right);
    };
    traversal(node);
    return result;
  }

  // also called as depth first search. returns parent node first and then goes for child node
  preOrder(node: Node | null = this.#root) {
    if (!node) return null;
    const result: number[] = [];
    const traversal = (node: Node) => {
      result.push(node.data);
      node.left && traversal(node.left);
      node.right && traversal(node.right);
    };
    traversal(node);
    return result;
  }

  // returns child node first and then goes for parent node
  postOrder(node: Node | null = this.#root) {
    if (!node) return null;
    const result: number[] = [];
    const traversal = (node: Node) => {
      node.left && traversal(node.left);
      node.right && traversal(node.right);
      result.push(node.data);
    };
    traversal(node);
    return result;
  }

  // also called as breadth first search. searched through level
  levelOrder(node: Node | null = this.#root) {
    const result: number[] = [];
    const q: Node[] = [];
    if (node) {
      q.push(node);
      while (q.length) {
        const currentNode = q.shift()!;
        result.push(currentNode.data);
        currentNode.left && q.push(currentNode.left);
        currentNode.right && q.push(currentNode.right);
      }
      return result;
    } else {
      return null;
    }
  }

  // Here the left node is higher than the parent node and the right node is smaller than the parent node. Switches every left and right node
  reverse(otherNode: Node | null = this.#root) {
    if (!otherNode) return null;
    let left = this.reverse(otherNode?.right);
    let right = this.reverse(otherNode?.left);
    otherNode.left = left;
    otherNode.right = right;
    return otherNode;
  }
}
