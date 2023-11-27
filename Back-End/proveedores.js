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
      const NIT = req.body['nit_proveedor']
      const nombre_proveedor = req.body['nombre_proveedor']
      const celular = req.body['celular']
      const direccion = req.body['direccion']
      con.connect(function(err) {
        if (err) throw err;
        var sql = "INSERT INTO proveedores (NIT,nombre_proveedor, celular, direccion) VALUES (?);";
        var values = [
          [NIT,nombre_proveedor,celular,direccion]
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
      var sql = "SELECT * FROM proveedores";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });     
  })
  
  //READ Solicitar Información de un producto
  router.get('/:id_proveedor', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT * FROM proveedores WHERE id_proveedor = ?;";
      var values = [req.params.id_proveedor]
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //UPDATE actualizar información que ya existe
  router.put('/:id_proveedor', (req, res) => {
    const NIT = req.body['NIT']  
    const nombre_proveedor = req.body['nombre_proveedor']
    const celular = req.body['celular']
    const direccion = req.body['direccion']
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE proveedores SET NIT = ?, nombre_proveedor = ?, celular = ?, direccion = ? WHERE id_proveedor = ?; ";
      var values = [NIT, nombre_proveedor, celular, direccion, req.params.id_proveedor]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records updated: " + result.affectedRows)        
      });
    });        
  })
    
  //DELETE Borrar información 
  router.delete('/:id_proveedor', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;
      var sql = "DELETE FROM proveedores WHERE id_proveedor = ?";
      var values = [req.params.id_proveedor]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records deleted: " + result.affectedRows)        
      });
    });   
  })

module.exports = router