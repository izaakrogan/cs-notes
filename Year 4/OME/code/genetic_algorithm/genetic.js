// generate initial population
var generatePopulation = (size,elementLength) => {
  var population = [];
  for (var i=0;i<size;i++) {
    population[i] = generateElement(elementLength);
  }
  population.complete = false;
  return population;
};

// generate a raw element for the inital population
var generateElement = (length) => {
  var elm = {};
  elm.phrase = '';
  elm.score = 0;
  for (var i=0;i<length;i++) {
    elm.phrase += newChar();
  }
  return elm;
};

// get a new character for mutations and initial population
var newChar = () => {
  var possible = "abcdefghijklmnopqrstuvwxyz.";
  return possible.charAt(Math.floor(Math.random() * possible.length));
};

// combine two parents to form a child
var mate = (parentA,parentB) => {
  var midpoint = Math.floor(Math.random() * parentA.phrase.length) + 1;
  var genesA = parentA.phrase.slice(0,midpoint);
  var genesB = parentB.phrase.slice(midpoint);
  var child = {
    'phrase':genesA+genesB,
    'score':0
  };
  return child;
};

// sometimes mutate characters in child
var mutate = (child) => {
  var mutationRate = 0.1;
  for (var i=0;i<child.phrase.length;i++) {
    if (Math.random() < mutationRate) {
      var newString = child.phrase.substr(0,i) + newChar() + child.phrase.substr(i+1);
      child.phrase = newString;
    }
  }
};

// test fitness and assign weights. Sort so easy to compare between populations
var testFitness = (population,target) => {
  population.map(i => {
    for (var j=0;j<target.length;j++) {
      if(i.phrase.charAt(j) === target.charAt(j)) {
        i.score += 1;
      }
      if(i.score === target.length) {
        population.complete = true;
      }
    }
  });
  population.sort((a, b) => b.score - a.score);
  return population;
};

// make selections and combine to form new population
var makeSelections = (weighedPop) => {
  var newPop = [];
  var sumOfWeights = 0;
  weighedPop.map(i => {
    sumOfWeights += i.score;
  });
  for (var k=0;k<weighedPop.length;k++) {
    var rand1 = Math.random();
    var rand2 = Math.random();
    var parentA = null;
    var parentB = null;
    var total = 0;
    // select two parents from weighted average
    for (var j=0;j<weighedPop.length;j++) {
      total += weighedPop[j].score;
      if (parentA === null && total/sumOfWeights >= rand1) {
        parentA = weighedPop[j];
      }
      if (parentB === null && total/sumOfWeights >= rand2) {
        parentB = weighedPop[j];
      }
      if(parentA !== null && parentB !== null) {
        var child = mate(parentA,parentB);
        var mutant = mutate(child);
        newPop.push(child);
        break;
      }
    }

  }
  weighedPop = testFitness(newPop,target);
  console.log('====================================');
  console.log('newPop', weighedPop);
  console.log('====================================');
  return weighedPop;
};

var target = 'globetown.io';
var population = generatePopulation(100,target.length);
var weighedPop = testFitness(population,target);
var counter = 0;
for (var i=0;i<10000;i++) {
  weighedPop = makeSelections(weighedPop);
  counter++;
  if(weighedPop.complete) {
    break;
  }
}
console.log('counter',counter);
