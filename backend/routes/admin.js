var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var db = require('../db-config.json');

var con = mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database
  })


  router.post("/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
     console.log("login router");
     let body = req.body;
  
     var userEmail = req.body.email;
     var userPassword = req.body.password;
     console.log("user email, password : " + userEmail + ", " + userPassword);
  
     var sql = "SELECT * FROM user WHERE email = ?";
     con.query(sql, [userEmail], function (error, results) {
       if (error) throw error;
       else {
         console.log(results[0]);
         if (userPassword == results[0].password) {
         
           console.log(results[0].email + " login!");
           
           res.json(results[0].email);
         } else {
           res.json('incorrect password');
         }
       }
     });
   });
  
  
  module.exports = router;