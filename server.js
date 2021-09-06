const express = require('express');

const app = express();

const port = process.env.PORT || 5000;

const nodesTreeRouter = require('./routes/nodesTree');

app.use(express.json({ limit: '10kb' }));

app.use(express.urlencoded({ extended: true, limit: '10kb' }));
//Public Folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // app.get('*', (req, res) => {
  //   res.setHeader('set-cookie', ['SameSite=Strict;SameSite=Strict']);
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  // });
}

app.use('/', nodesTreeRouter);
app.all('*', (req, res) => {
  res.status(200).json({ message: 'no route found' });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
