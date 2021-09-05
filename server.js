const express = require('express');

const app = express();

const port = 5000;

const nodesTreeRouter = require('./routes/nodesTree');

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/nodes', nodesTreeRouter);

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
