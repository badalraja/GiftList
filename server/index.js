const express = require('express');
const MerkleTree = require('../utils/MerkleTree');
const verifyProof = require('../utils/verifyProof');
const niceList = require('../utils/niceList');

const port = 1225;

const app = express();
app.use(express.json());

const merkleTree = new MerkleTree(niceList);

// get the root
const root = merkleTree.getRoot();

// find the proof that norman block is in the list 



app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name
  const index = niceList.findIndex(n => n === name);
  const proof = merkleTree.getProof(index);
    
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof(proof, name, root);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
