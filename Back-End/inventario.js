const express = require("express")
const router = express.Router()
const mysql = require('mysql2');
const moment = require('moment'); 

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "developer",
    database: "inventario_ohlala"
  });

  //CREATE Enviar nueva Información
  router.post('/', (req, res) => {   
    const id_insumo = req.body['id_insumo']
    const cantidad = req.body['cantidad']
    const unidad = req.body['unidad']
    const fecha_ingreso = moment(req.body['fecha_ingreso'])
    const fecha_caducidad = moment(req.body['fecha_caducidad'])
    const id_proveedor = req.body['id_proveedor']

    con.connect(function(err) {

      if (cantidad <=0) {
        res.json(0)
        return
      } 

      if (err) throw err;
      var sql = "INSERT INTO inventario (id_insumos, cantidad, unidad,fecha_ingreso ,fecha_caducidad,id_proveedor) VALUES (?);";
      var values = [
        [id_insumo,cantidad,unidad,fecha_ingreso.format('YYYY-MM-DD'),fecha_caducidad.format('YYYY-MM-DD'),id_proveedor]
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
    var sql = "SELECT proveedores.nombre_proveedor AS nombre_proveedor, insumos.nombre_insumo AS nombre_insumo, inventario.id_lote, inventario.cantidad,inventario.unidad, DATE_FORMAT(inventario.fecha_ingreso,'%Y-%m-%d') AS fecha_ingreso, DATE_FORMAT(inventario.fecha_caducidad,'%Y-%m-%d') AS fecha_caducidad,inventario.id_proveedor FROM inventario JOIN insumos ON insumos.id_insumos = inventario.id_insumos JOIN proveedores ON proveedores.id_proveedor = inventario.id_proveedor ";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result)        
    });
  });   
})

//READ Solicitar Información de un producto
router.get('/:id_lote', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;    
    var sql = "SELECT proveedores.nombre_proveedor AS nombre_proveedor, insumos.id_insumos,insumos.nombre_insumo AS nombre_insumo, inventario.id_lote, inventario.cantidad AS cantidad,inventario.unidad AS unidad, DATE_FORMAT(inventario.fecha_ingreso,'%Y-%m-%d') AS fecha_ingreso, DATE_FORMAT(inventario.fecha_caducidad,'%Y-%m-%d') AS fecha_caducidad,inventario.id_proveedor FROM inventario JOIN insumos ON insumos.id_insumos = inventario.id_insumos JOIN proveedores ON proveedores.id_proveedor = inventario.id_proveedor WHERE id_lote = ?;";
    var values = [req.params.id_lote]
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json(result)        
    });
  });   
})

//UPDATE actualizar información que ya existe

router.put('/:id_lote', (req, res) => {
  
  const id_insumo = req.body['id_insumo']
  const cantidad = req.body['cantidad']
  const unidad = req.body['unidad']
  const fecha_ingreso = req.body['fecha_ingreso']
  const fecha_caducidad = req.body['fecha_caducidad']
  const id_proveedor = req.body['id_proveedor']
  con.connect(function(err) {
    if (cantidad <=0) {
      res.json(0)
      return
    } 
    if (err) throw err;
    var sql = "UPDATE inventario SET id_insumos = ?, cantidad = ?, unidad = ?, fecha_ingreso = ?, fecha_caducidad = ?, id_proveedor = ? WHERE id_lote = ?; ";
    var values = [id_insumo, cantidad,unidad,fecha_ingreso,fecha_caducidad,id_proveedor, req.params.id_lote]      
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json("Number of records updated: " + result.affectedRows)        
    });
  });        
})
  
//DELETE Borrar información 
router.delete('/:id_lote', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM inventario WHERE id_lote = ?";
    var values = [req.params.id_lote]      
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json("Number of records deleted: " + result.affectedRows)        
    });
  });   
})



module.exports = router