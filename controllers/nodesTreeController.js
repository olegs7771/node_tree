const fs = require('fs');
const csv = require('csv-parser');
const { Parser } = require('json2csv');

const { createReadStream } = require('fs');
let results = [];

// Fetching Node Tree File and pushing into results on server reload
const getNodeTree = () => {
  const stream = createReadStream('./tree_data_1.csv');
  stream
    .pipe(csv({ separator: '\t' }))
    .on('data', (data) => {
      results.push(data);
    })
    .on('end', () => {
      results.push(0);
    });
  return results;
};
getNodeTree();

const writeToFile = (path, data) => {
  fs.writeFile(path, data, (err) => {
    if (err) {
      console.error(err);
    }
    console.log('sucess!');
  });
};

//Get Random Number Id (min 30 max 1000)
const getRandomId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// ROUTES ❗❗❗❗❗❗❗❗❗❗❗❗❗❗

//Get All Nodes Tree Route  🟧
const getNodesTree = (req, res, next) => {
  // const nodes = getJSON_NodeTree();
  res.json(results);
};

//Update Node by Id and respond with updated Node Tree / error if read_only ==='0' 🟧
const updateNodeById = (req, res, next) => {
  // const nodes = getJSON_NodeTree();
  console.log('req.body', req.body);
  // Find Index of object by Id
  const objIndex = results.findIndex((obj) => obj.id === req.body.id);

  // Check if Node Object read_only true
  const nodeObject = results.filter((node) => node.id === req.body.id);

  if (nodeObject[0].read_only === '0') {
    res.status(400).json({ error: 'Cannot update this Node' });
  } else {
    results[objIndex] = { ...results[objIndex], name: req.body.name };

    res.json({ message: 'success', results });
  }
};

// Delete Node by id / respond with error if read_only==='0'  🟧
const deleteNodeById = (req, res, next) => {
  console.log('req.body', req.body);

  // Find Index of object by Id
  const objIndex = results.findIndex((obj) => obj.id === req.body.id);

  // Check if Node Object read_only true
  const nodeObject = results.filter((node) => node.id === req.body.id);

  if (nodeObject[0].read_only === '0') {
    res.status(400).json({ error: 'Cannot delete this Node' });
  } else {
    // results[objIndex] = { ...results[objIndex], name: req.body.name };
    results.splice(objIndex, 1);

    res.json({ message: 'success', results });
  }
};

// Create new Node Object under parent Node by Id 🟧
const createNodeById = (req, res, next) => {
  console.log('req.body', req.body);
  // Find Index of object by Id

  const objIndex = results.findIndex((obj) => obj.id === req.body.id);
  console.log('objIndex', objIndex);
  if (objIndex === -1) {
    res.status(400).json({ error: 'Cannot create Node . Id not found.' });
  } else {
    //To do create new Node
    // 1)  Create Object
    const newObj = {
      id: JSON.stringify(getRandomId(30, 100)),
      name: req.body.name,
      description: req.body.description,
      parent: req.body.parent,
      read_only: req.body.read_only,
    };

    results.splice(objIndex + 1, 0, newObj);

    res.json(results);
  }
};

//Fetch NodeTree and convert to tab-delimited CSV 🟧
const getCSV = async (req, res, next) => {
  const fields = ['id', 'name', 'description', 'parent', 'read_only'];

  const opts = { fields };

  try {
    const parser = new Parser({
      fields,
      quote: '',
      delimiter: '\t',
    });
    const csv = parser.parse(results);
    writeToFile('./tree_data_1.csv', csv);

    console.log('csv', csv);
    const file = './tree_data_1.csv';
    console.log('file', file);
    fs.readFile(file, (err, content) => {
      if (err) {
        res.status(400).json({ error: 'No file' });
      } else {
        res.writeHead(200, { 'Content-type': 'text/csv' });
        res.end(content);
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getNodesTree,
  updateNodeById,
  deleteNodeById,
  createNodeById,
  getCSV,
};
