const express = require("express")
const router = express.Router()
const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "developer",
    database: "inventario_ohlala"
  });
  
  //CREATE Enviar nueva Información
  router.post('/', (req, res) => {  

      const capacidad = req.body['capacidad']
      const numero_mesa = req.body['numero_mesa']
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO mesa (capacidad, numero_mesa) VALUES (?);";
        var values = [
          [capacidad,numero_mesa]
        ]
        con.query(sql, values, function (err, result) {
          if (err) throw err;
          res.json("1 record inserted")        
        });
      });    
  })
  
  //READ Solicitar Información
  router.get('/', (req, res) => {
    
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT * FROM mesa";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //READ Solicitar Información de un producto
  router.get('/:id_mesa', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT * FROM mesa WHERE id_mesa = ?;";
      var values = [req.params.id_mesa]
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //UPDATE actualizar información que ya existe
  router.put('/:id_mesa', (req, res) => {  
    const capacidad = req.body['capacidad']
    const numero_mesa = req.body['numero_mesa']
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE mesa SET capacidad = ?, numero_mesa = ? WHERE id_mesa = ?; ";
      var values = [capacidad, numero_mesa, req.params.id_mesa]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records updated: " + result.affectedRows)        
      });
    });        
  })
    
  //DELETE Borrar información 
  router.delete('/:id_mesa', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;
      var sql = "DELETE FROM mesa WHERE id_mesa = ?";
      var values = [req.params.id_mesa]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records deleted: " + result.affectedRows)        
      });
    });   
  })

module.exports = router