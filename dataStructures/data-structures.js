/* Tree 
  -addChild()
  -contains()
*/

var Tree = function(val){
  this.value = val;
  this.children = [];
}

Tree.prototype.addChild = function(val){
  var newTree = new Tree(val);
  this.children.push(newTree);
}

Tree.prototype.contains = function(target){
  function recurse(node){
    console.log(node)
    if(node.value === target) return true;
    else{
      for(var i = 0; i < node.children.length; i++){
        return recurse(node.children[i]);
      }
      return false;
    }
  }
  return recurse(this);
}

var BinaryTree = function(val){
  this.value = val;
  this.left = null;
  this.right = null;
}

BinaryTree.prototype.addChild = function(val, current){
  var current = current || this;
  if(current.value < val){
    if(current.right === null){
      current.right = new BinaryTree(val);
    }else{
      current.addChild(val, current.right);
    }
  } else if(current.value > val){
    if(current.left === null){
      current.left = new BinaryTree(val);
    } else{
      current.addChild(val, current.left);
    }
  } else{ //if val equals a value in our tree
    return null;
  }
}

/* Self Balancing Binary Search Tree 
  -insert
  -delete
  */
//the height of the two child subtrees of any node differ by at most 1. 
//if its ever more than 1 it rebalences

/* BalanceFactor = Rdepth - Ldepth */
var AvlTree = function(){
  this.root = null;
}

function Node(value, left, right, parent, height){
  this.value = value;
  this.left = left;
  this.right = right;
  this.parent = parent;
  this.height = height;
}

AvlTree.prototype.addChild = function(val, current){
  if (this.root === null) {
    this.root = new Node(val, null, null, null, 0);
  }
  var current = current || this.root;
  if(current.value < val){
    if(current.right === null){
      current.right = new Node(val, null, null, current, 0);
    }else{
      this.addChild(val, current.right);
    }
  } else if(current.value > val){
    if(current.left === null){
      current.left = new Node(val, null, null, current, 0);
    } else{
      this.addChild(val, current.left);
    }
  } else{ //if val equals a value in our tree
    return null;
  }

  //every time we exit addChild, we want to reassign BF
  this.reassignBalanceFactorValues(current);

  //then if BF is 2 or greater, we rebalance
  if(Math.abs(current.height) >= 2){
    if (current.height >= 2) {
      this.rotateLeft(current);
    } else if (current.height <= -2) {
      //RotateRight here
    }
  }
}

AvlTree.prototype.reassignBalanceFactorValues = function(current) {
    // console.log("ReAssigning", current.value, "'s height of", current.height)
    //if no children, height 0
    if(current.left === null && current.right === null){
      current.height = 0;
    }
    //if children, then adjust height
    if(current.left){
      current.height--;
    } else if(current.right){
      current.height++;
    }
    // console.log(" to", current.height)
}

AvlTree.prototype.rotateLeft = function(nodeZ) {
  var nodeY = nodeZ.right;
  var nodeX = nodeY.right;
  if (nodeZ.parent !== null){
    var orientation = (nodeZ.parent.left === nodeZ) ? 'left' : 'right';
    nodeZ.parent[orientation] = nodeY;
    nodeY.parent = nodeZ.parent;
  }else {
    this.root = nodeY;
    nodeY.parent = null;
  }
  var tempRoot;

  if(this.root === nodeZ){
    this.root = nodeY;
  } else {
    tempRoot = nodeZ.parent;
  }

  nodeY.parent = null;
  nodeZ.right = nodeY.left;
  nodeY.left = nodeZ;
  nodeZ.parent = nodeY;
  nodeY.parent = tempRoot;
  //reset height factor for each node
  this.reassignBalanceFactorValues(nodeX);
  this.reassignBalanceFactorValues(nodeY);
  this.reassignBalanceFactorValues(nodeZ);
}


/* TODO: Red-Black Tree 
  -insert
  -delete
  */



/* Heap  (Work in Progress)
  find-max
  find-min
  insert()
  createHeap
  heapify - (create a heap out of given array of elements)
  merge(join two heaps to form a valid new heap)(preserves original heaps)
  size(returns size of heap)
    // for internal use:
  sift-up: move a node up in the tree, as long as needed; used to restore 
           heap condition after insertion. Called "sift" because node 
           moves up the tree until it reaches the correct level, as in a sieve.
  sift-down: move a node down in the tree, similar to sift-up; used to restore heap condition after deletion or replacement.

  */
function Heap(val){
  this.value = val;
  this.left = null;
  this.right = null;
}
Heap.prototype.addChild = function(val, current){
  var current = current || this;
  if(current.value < val){
    if(current.left === null){
      current.left = new Heap(val);
    } else if(current.right === null) {
      current.right = new Heap(val);
    } else{
      if(!!current.left.left && !!current.left.right){
        this.addChild(val, current.right);
      }else{
        this.addChild(val, current.left);
      }
      //TODO:if above addChild doesn't find an
      //open slot we need to call
      //this.addChild(val, current.right);
    }
  } else {
    // SWAP WITH LEFT CHILD
    var temp = {};
    temp.value = current.value;
    temp.left = current.left;
    temp.right = current.right;
    var newHeap = new Heap(val)
    current.value = newHeap.value;
    current.left = newHeap.left;
    current.right = newHeap.right;
    current.left = temp;

    //set current to temp var
    //reassign current to val
    console.log("need to swap nodes here")
  }
}

// var myHeap = new Heap(3);
// myHeap.addChild(2);
// myHeap.addChild(1);



// console.log(myHeap)


/* B-tree 
  insert into a full node
  delete from min node
*/


/* Linked List 
  -addToTail()
  -removeHead()
  -contains()
*/

var LinkedList = function(){
  var list = {};
  list.head = null;
  list.tail = null;

  list.addToTail = function(value){
    var myNode = Node(value);
    if(list.tail === null){
      list.head = myNode;
    }else{
      list.head.next = myNode;
    }
    list.tail = myNode;
  };

  list.removeHead = function(){
    if(list.head){
      var temp = list.head.value;
      list.head = list.head.next;
      return temp;
    }
  };

  list.contains = function(target){
    var result = false;
    var recursion = function(node){
      if(node.value === target){
        result = true;
        return;
      }else{
        if(node.next !== null){ 
        recursion(node.next);
        }
        return;
      }
    }
    recursion(list.head);
    return result;
  };


  return list;
};

var Node = function(value){
  var node = {};
  node.value = value;
  node.next = null;
  return node;
};

/* Graph 
  -addNode()
  -contains()
  -removeNode()
  -addEdge()
  -hasEdge()
  -removeEdge()
  -forEachNode()
*/
var Graph = function(){
  this.nodes = {}
};
Graph.prototype.addNode = function(node){

  var obj = {};
  obj.node = node;
  obj.edges = {};
  this.nodes[node] = obj;
};

Graph.prototype.contains = function(node){
  return this.nodes[node] ? true : false;
};

Graph.prototype.removeNode = function(node){
  delete this.nodes[node];
};

Graph.prototype.hasEdge = function(fromNode, toNode){
  if(this.contains(fromNode) && this.contains(toNode)){
    if(this.nodes[fromNode].edges[toNode]){
      return true;
    }else{
      return false;
    }
  }
};

Graph.prototype.addEdge = function(fromNode, toNode){
  this.nodes[fromNode].edges[toNode] = this.nodes[toNode];
  this.nodes[toNode].edges[fromNode] = this.nodes[fromNode];
};

Graph.prototype.removeEdge = function(fromNode, toNode){
  delete this.nodes[fromNode].edges[toNode];
  delete this.nodes[toNode].edges[fromNode];
};

Graph.prototype.forEachNode = function(cb){
  for (var node in this.nodes) {
    cb(node);
  }
}

/* Hash Tables */

var HashTable = function(){
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
};

HashTable.prototype.insert = function(k, v){
  var i = getIndexBelowMaxForKey(k, this._limit);
  //if tuple exists at index this._storage.get(i)
  var bucket = this._storage.get(i) || [];
  var tuple = [k,v];
  if(bucket.length){
    if(bucket[0][0] === k){
      bucket[0][1] = v;
    }else{
      bucket.push(tuple);
    }
  }else{
    bucket.push(tuple);
  }
  this._storage.set(i, bucket); 
  return i;
};

HashTable.prototype.retrieve = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i) || [];
  debugger;
    if(bucket.length){
      for(var i = 0; i < bucket.length; i++){
        if(k === bucket[i][0]){
          return bucket[i][1];
        }
      }
    }else{
      return null;
    }
};

HashTable.prototype.remove = function(k){
  var i = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(i) || [];

  for(var i = 0; i < bucket.length; i++){
    if( k === bucket[i][0]){

      bucket = bucket.splice(i, 1);
    }
  }
};



/*
 * Complexity: What is the time complexity of the above functions?
 */




















