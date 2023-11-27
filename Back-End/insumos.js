const express = require("express")
const router = express.Router()
const mysql = require('mysql2');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "developer",
    database: "inventario_ohlala"
  });
  
  //CREATE Enviar nueva Información
  router.post('/', (req, res) => {   
      
      const nombre_insumo = req.body['nombre_insumo']    
      con.connect(function(err) {
        if (err) res.json("error");
        let sql = "INSERT INTO insumos (nombre_insumo) VALUES (?);";
        let values = [
          [nombre_insumo]
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
      let sql = "SELECT id_insumos, nombre_insumo FROM insumos";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result) 
        console.log(result)       
      });
    });     
  })
  
  //READ Solicitar Información de un producto
  router.get('/:id_insumos', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      let sql = "SELECT * FROM insumos WHERE id_insumos = ?;";
      let values = [req.params.id_insumos]
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //UPDATE actualizar información que ya existe
  router.put('/:id_insumos', (req, res) => {  
    const nombre_insumo = req.body['nombre_insumo']
    con.connect(function(err) {
      if (err) throw err;
      let sql = "UPDATE insumos SET nombre_insumo = ? WHERE id_insumos = ?; ";
      let values = [nombre_insumo, req.params.id_insumos]      
      con.query(sql, values, function (err, result) {
        if (err){
          console.log(err)
          res.status(500).json(err)
        } else{
          res.json("Number of records updated: " + result.affectedRows)        
        }        
      });
    });        
  })
    
  //DELETE Borrar información 
  router.delete('/:id_insumos', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;
      let sql = "DELETE FROM insumos WHERE id_insumos = ?";
      let values = [req.params.id_insumos]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records deleted: " + result.affectedRows)        
      });
    });   
  })

module.exports = router