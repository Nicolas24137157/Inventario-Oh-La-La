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
      const observacion = req.body['observacion']
      const identificacion = req.body['identificacion']
      const numero_etiqueta = req.body['numero_etiqueta']
      const id_producto = req.body['id_producto']
      con.connect(function(err) {
        const fechaActual = new Date();
        const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');              
        if (err) throw err;

        var sql = "SELECT id_producto FROM pedido WHERE numero_etiqueta = ?;";
        var values = [
          [numero_etiqueta]
        ]
        con.query(sql, values, function (err, resultpedido) {
        for (let index = 0; index < resultpedido.length; index++) {
          const element = resultpedido[index];
          
          var sql = "INSERT INTO devolucion_plato (observacion, numero_etiqueta,id_producto,hora_devolucion) VALUES (?);";
          var values = [
            [observacion,numero_etiqueta,element.id_producto,fechaFormateada]
          ]
    
          con.query(sql, values, function (err, result) {          
            if (err) throw err;
            res.json("1 record inserted")        
          });
        }  
      })
      });    
  })
  
  //READ Solicitar Información
  router.get('/', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT * FROM devolucion_plato";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //READ Solicitar Información de un producto
  router.get('/:id_producto', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT devolucion_plato.id_devolucion,pedido.numero_etiqueta AS numero_etiqueta,productos.id_producto AS id_producto, DATE_FORMAT(hora_devolucion,'%m/%d/%Y %h:%i %p') AS hora_devolucion,devolucion_plato.observacion AS observacion, FROM devolucion_plato JOIN pedido ON pedido.id_pedido = devolucion_plato.numero_etiqueta JOIN producto ON producto.nombre_producto = devolucion_plato.nombre_producto";
      var values = [req.params.id_producto]
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //UPDATE actualizar información que ya existe
  router.put('/:id_producto', (req, res) => {  
    const nombre_producto = req.body['nombre_producto']
    const precio = req.body['precio']
    const descripcion = req.body['descripcion']
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE productos SET nombre_producto = ?, precio = ?, descripcion = ? WHERE id_producto = ?; ";
      var values = [nombre_producto, precio,descripcion, req.params.id_producto]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records updated: " + result.affectedRows)        
      });
    });        
  })
    
  //DELETE Borrar información 
  router.delete('/:id_producto', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;
      var sql = "DELETE FROM productos WHERE id_producto = ?";
      var values = [req.params.id_producto]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records deleted: " + result.affectedRows)        
      });
    });   
  })

module.exports = router