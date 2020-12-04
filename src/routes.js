// This is the routes.js file!

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
var Router = express.Router();

const connection = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'russian_surfer'
});

Router.get('/lieux', function (req, res) {
    connection.getConnection(function (err, c) {
    connection.query('SELECT * FROM lieu', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });
  });
});


module.exports = Router;