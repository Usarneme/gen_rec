/* Data definitions */

// Node: a section of the tree
// contains: name (String), and a list (Array) of children nodes
class node {
    constructor(name, children) {
        this.name = name
        this.children = children
    }
}

// List of Nodes - ex:
const listOfNodes = [new node()]

/*---------------------------------------------------------------- */

/* Functions */

// Count: return the total number of nodes in the tree, including the parent node

// BreadthFirstTraversal
// @param: Node - on first call this is the parent/topmost node
const countNodesBreadthFirst = (node) => {
    return fnForNodeBFS(node, [], 0)
}

const fnForNodeBFS = (node, todo = [], resultsSoFar) => {
    const newTodo = [...todo, ...node.children]
    return fnForListOfNodesBFS(newTodo, resultsSoFar + 1)
}

const fnForListOfNodesBFS = (todo = [], resultsSoFar) => {
    if (todo.length === 0) return resultsSoFar;

    const first = todo.shift()
    return fnForNodeBFS(first, todo, resultsSoFar)
}


// DepthFirstTraversal
// @param: Node - on first call this is the parent/topmost node
const countNodesDepthFirst = (node) => {
    return fnForNodeDFS(node, [], 0)
}

const fnForNodeDFS = (node, todo = [], resultsSoFar) => {
    const newTodo = [...node.children, ...todo]
    return fnForListOfNodesDFS(newTodo, resultsSoFar + 1)
}

const fnForListOfNodesDFS = (todo = [], resultsSoFar) => {
    if (todo.length === 0) return resultsSoFar;

    const first = todo.shift()
    return fnForNodeDFS(first, todo, resultsSoFar)
}


// Tests:
const parent = new node("a", [])
const childb = new node("b", [])
const childc = new node("c", [])
const childd = new node("d", [])
const childe = new node("e", [])
const childf = new node("f", [])
const childg = new node("g", [])
const childh = new node("h", [])

parent.children = [childb, childc]
childb.children = [childd, childe]
childd.children = [childg]
childc.children = [childf]
childf.children = [childh]

// Example Tree:
//         a
//     b       c
//   d   e       f
// g            h

console.log("Running tests for Breadth First Approach")
console.log("Counting Nodes for parent:", countNodesBreadthFirst(parent))
// expect countNodesBreadthFirst(parent) => 8

console.log("Counting Nodes for childb:", countNodesBreadthFirst(childb))
// expect countNodesBreadthFirst(childb) => 4

console.log("Counting Nodes for childc:", countNodesBreadthFirst(childc))
// expect countNodesBreadthFirst(childc) => 3

console.log("Running tests for Depth First Approach")
console.log("Counting Nodes for parent:", countNodesDepthFirst(parent))
// expect countNodesDepthFirst(parent) => 8

console.log("Counting Nodes for childb:", countNodesDepthFirst(childb))
// expect countNodesDepthFirst(childb) => 4

console.log("Counting Nodes for childc:", countNodesDepthFirst(childc))
// expect countNodesDepthFirst(childc) => 3

