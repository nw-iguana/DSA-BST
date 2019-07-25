class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
  
  insert(key, value) {
    if (this.key == null) {
      this.key = key
      this.value = value
    } else if (key < this.key) {
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this)
      } else {
        this.left.insert(key, value)
      }
    } else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this)
      } else {
        this.right.insert(key, value)
      }
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.left._findMax()
        this.key = successor.key
        this.value = successor.value
        successor.remove(successor.key)
      } else if (this.left) {
        this._replaceWith(this.left)
      } else if (this.right) {
        this._replaceWith(this.right)
      } else {
        this._replaceWith(null)
      }
    } else if (key < this.key && this.left) {
      this.left.remove(key)
    } else if (key > this.key && this.right) {
      this.right.remove(key)
    } else {
      throw new Error('Key Error')
    }
  }

  find(key) {
    if (this.key == key) {
      return this
    } else if (key < this.key && this.left) {
      return this.left.find(key)
    } else if (key > this.key && this.right) {
      return this.right.find(key)
    } else {
      throw new Error('Key Error')
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node
      } else if (this == this.parent.right) {
        this.parent.right = node
      } if (node) {
        node.parent = this.parent
      }
    } else {
      if (node) {
        this.key = node.key
        this.value = node.value
        this.left = node.left
        this.right = node.right
      } else {
        this.key = null
        this.value = null
        this.left = null
        this.right = null
      }
    }
  }

  _findMax() {
    if (!this.right) {
        return this;
    }
    return this.right._findMax();
  }
}

function treeHeight(tree) {
  if (tree.left && tree.right) {
    return 1 + Math.max(treeHeight(tree.left), treeHeight(tree.right));
  } else if (tree.left) {
    return 1 + treeHeight(tree.left)
  } else if (tree.right) {
    return 1 + treeHeight(tree.right)
  } else {
    return 1
  }
}

function isItBst(tree) {
  if (tree.left && tree.right) {
    if (tree.left.key > tree.key || tree.right.key < tree.key) {
      return false
    } else if (tree.right.key > tree.key && tree.left.key < tree.key) {
      return isItBst(tree.right) && isItBst(tree.left)
    }
  } else if (tree.left) {
    return isItBst(tree.left)
  } else if (tree.right) {
    return isItBst(tree.right)
  } else {
    return true
  }
}

function balancedBst(tree) {
  let leftHeight = treeHeight(tree.left)
  let rightHeight = treeHeight(tree.right)

  if (leftHeight + 1 === rightHeight || leftHeight - 1 === rightHeight || leftHeight === rightHeight) {
    return true
  } else {
    return false
  }
}

function sameBsts(tree1, tree2) {
  if (tree1[0] !== tree2[0]) {
    return false
  } else if (tree1.length !== tree2.length) {
    return false
  } else {
    let t1greater = []
    let t1less = []
    let t2greater = []
    let t2less = []

    for (let i = 0; i < tree1.length; i++) {
      if (tree1[i] === tree1[0]) continue // don't push the root of the tree into either array
      tree1[i] > tree1[0] ? t1greater.push(tree1[i]) : t1less.push(tree1[i])
    }
    for (let j = 0; j < tree2.length; j++) {
      if (tree2[j] === tree2[0]) continue // don't push the root of the tree into either array
      tree2[j] > tree2[0] ? t2greater.push(tree2[j]) : t2less.push(tree2[j])
    }

    console.log('t1greater', t1greater)
    console.log('t2greater', t2greater)
    console.log('t1less', t1less)
    console.log('t2less', t2less)
    
    let checkGreaterThan
    let checkLessThan

    if (t1greater[0] !== t2greater[0] || t1less[0] !== t2less[0]) {
      // if the nodes are different then we can immediately set
      // check variables to false
      checkGreaterThan = false
      checkLessThan = false
    } else {
      // the order of the subsequent numbers doesn't matter as long
      // as the numbers are the same, so first we remove the first value
      // (the root of each node).
      // we then sort the arrays so that we can compare if the numbers
      // in each are the same. this works for checking each node
      // and its children, so if given a longer array/larger tree,
      // we would then have to refactor this into a recursive
      // function that gets called for every node. this means a time
      // compexity of O(2^n) aka exponential time because each
      // recursive function call will run through more for loops.
      t1greater = t1greater.slice(1, t1greater.length).sort()
      t2greater = t2greater.slice(1, t2greater.length).sort()
      t1less = t1less.slice(1, t1less.length).sort()
      t2less = t2less.slice(1, t2less.length).sort()

      console.log('slice & sort t1greater', t1greater)
      console.log('slice & sort t2greater', t2greater)
      console.log('slice & sort t1less', t1less)
      console.log('slice & sort t2less', t2less)
  
      for (let k = 0; k < t1greater.length; k++) {
        let a = t1greater[k]
        let b = t2greater[k]
        checkGreaterThan = a !== b ? false : true
      }
      for (let k = 0; k < t1less.length; k++) {
        let a = t1less[k]
        let b = t2less[k]
        checkLessThan = a !== b ? false : true
      }
    }
    
    console.log('checkGreaterThan', checkGreaterThan)
    console.log('checkLessThan', checkLessThan)

    return checkGreaterThan === true && checkLessThan === true
  }
}

function createTree() {
  const BST = new BinarySearchTree()
  let inputs = [3,1,4,6,9,2,5];
  
  inputs.forEach(i => BST.insert(i));
  return BST
}

// console.log(createTree())
// console.log('balanced BST?', balancedBst(createTree()))
console.log('same BSTs?', sameBsts([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]))