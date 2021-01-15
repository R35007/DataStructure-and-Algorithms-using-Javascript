/* Trie */
// functions : add, isWord, getWords, root, entries

class Node {
  keys: Map<string, Node> = new Map();
  end: boolean = false;
  isEnd = () => this.end;
  setEnd = () => (this.end = true);
}

export class Trie {
  #root: Node;

  constructor(arr: string[] = []) {
    this.#root = new Node();
  }

  add(word: string, node: Node = this.#root): Trie {
    if (!word.length) {
      node.setEnd();
      return this;
    } else if (!node.keys.has(word[0] as string)) {
      node.keys.set(word[0] as string, new Node());
      return this.add(word.substr(1), node.keys.get(word[0] as string)!);
    } else {
      return this.add(word.substr(1), node.keys.get(word[0] as string)!);
    }
  }

  isWord(word: string, node: Node = this.#root): boolean {
    if (!word.length) {
      return node.isEnd();
    } else if (!node.keys.has(word[0] as string)) {
      return false;
    } else {
      return this.isWord(word.substr(1), node.keys.get(word[0] as string)!);
    }
  }

  entries() {
    let node: Node = this.#root;
    if (!node.keys.size) return [];
    const result: string[] = [];
    const getEntries = (node: Node, word: string = "") => {
      if (node.keys.size) {
        [...node.keys.keys()].forEach((letter) => getEntries(node.keys.get(letter)!, word.concat(letter)));
        if (node.isEnd()) result.push(word);
      } else {
        return word.length ? result.push(word) : undefined;
      }
    };
    getEntries(this.#root);
    return result;
  }

  root() {
    return this.#root;
  }
}
