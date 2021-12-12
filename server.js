const express = require('express');
const app = express();
const routes = require('./components/controller');
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const fs = require('fs');
var path = require('path');

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(express.static('public'))

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use('/', routes);


//error for other end-points
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Houston! We Have A Problem!!!' });
});

app.use((err, req, res, next) => {
  console.log(err);
  if(!err){
    return res.status(err.output.statusCode).json(err.output.payload);
  }
  return res.status(500).end();
});
const port  = process.env.PORT;

//listen on port
const server = app.listen(port, () => {
    console.log(`Server listening on ${port}`)
  });

module.exports = app;