var nodes = {
  's':{
    'value':0,
    'parent':null
  },
  'a':{
    'value':1000,
    'parent':null
  },
  'b':{
    'value':1000,
    'parent':null
  },
  'c':{
    'value':1000,
    'parent':null
  }
};

var edges = [
  {
    'start':'s',
    'end':'a',
    'weight':10
  },
  {
    'start':'s',
    'end':'b',
    'weight':3
  },
  {
    'start':'b',
    'end':'a',
    'weight':1
  },
  {
    'start':'a',
    'end':'c',
    'weight':1
  },
  {
    'start':'b',
    'end':'c',
    'weight':1
  },
  {
    'start':'c',
    'end':'a',
    'weight':10
  },
];
var relax = (nodes,u,v,w) => {
  if(nodes[v].value > nodes[u].value + w) {
    nodes[v].value = nodes[u].value + w;
    nodes[v].parent = u;
  }
};

var bf = (nodes, edges) => {
  for (var i=0;i<Object.keys(nodes).length-1;++i) {
    for (var j=0;j<edges.length;j++) {
      relax(nodes,edges[j].start,edges[j].end,edges[j].weight);
    }
  }
  for (var k=0;k<edges.length;k++) {
    var u = edges[k].start;
    var v = edges[k].end;
    var w = edges[k].weight;
    if(nodes[v].value > nodes[u].value + w) {
      console.log('negative cycle found');
    }
  }
  console.log(nodes);
};

bf(nodes, edges);
