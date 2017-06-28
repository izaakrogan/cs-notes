var nodes = {
  's': {
    'name':'s',
    'value':0,
    'parent':null,
    'adjacent':['a','b']
  },
  'a': {
    'name':'a',
    'value':1000,
    'parent':null,
    'adjacent':['c']
  },
  'b': {
    'name':'b',
    'value':1000,
    'parent':null,
    'adjacent':['a','c']
  },
  'c': {
    'name':'c',
    'value':1000,
    'parent':null,
    'adjacent':[]
  }
};

var edges = {
  'sa':10,
  'sb':3,
  'ba':1,
  'ac':1,
  'bc':1
};

var enqueue = (array,node) => {
  return array.push(node);
};

var dequeue = (array) => {
  return array.shift();
};

var relax = (nodes,u,v,w,fifo) => {
  if(nodes[v].value > nodes[u].value + w) {
    nodes[v].value = nodes[u].value + w;
    nodes[v].parent = u;
    if (fifo.indexOf(v) === -1) {
      enqueue(fifo,nodes[v]);
    }
  }
};

var bellmanFifo = (nodes, edges) => {
  var fifo = [];
  enqueue(fifo,nodes.s);
  while (fifo.length > 0) {
    var node = dequeue(fifo);
    var u = node.name;
    for(var i in node.adjacent){
      var v = node.adjacent[i];
      var edge = u + v;
      relax(nodes,u,v,edges[edge],fifo);
    }
  }
  console.log('final', nodes);
};

bellmanFifo(nodes, edges);
