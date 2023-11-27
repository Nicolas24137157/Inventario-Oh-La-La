const {cliente, jsonCliente, jsonReserva} = require('./clases');
const moment = require('moment'); 



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

    const nombre_cliente = req.body['nombre_cliente']
    const tipo_identificacion = req.body['tipo_identificacion']
    const identificacion = req.body['identificacion']
    const celular = req.body['celular']
    const correo = req.body['correo']
    const numero_mesa = req.body['numero_mesa']
    const hora_reserva = req.body['hora_reserva']
      
    
  // Validacion para solo poder escoger las mesas que están disponibles.
  // Obtiene la hora actual
  // Si estás en un entorno de Node.js
  const fecha = moment(hora_reserva);

  var horaActual = new Date(hora_reserva);
  // Suma 2 horas a la hora actual
  horaActual.setHours(horaActual.getHours() - 2);
  const horamenos = moment(horaActual)
  horaActual.setHours(horaActual.getHours() + 4);
  const horamas = moment(horaActual)
  const horaactual = moment(hora_reserva)
  // Muestra la hora actual más 2 horas
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT cliente.identificacion AS identificacion,mesa.id_mesa AS id_mesa, DATE_FORMAT(reserva.hora_reserva,'%Y-%m-%d %H:%i:%s') AS hora_reserva FROM reserva JOIN cliente ON cliente.identificacion = reserva.identificacion  JOIN mesa ON mesa.id_mesa = reserva.id_mesa WHERE reserva.id_mesa = ? AND estado LIKE '%Pendiente%' AND reserva.hora_reserva BETWEEN ? AND ? ;";   
    var values = [numero_mesa,horamenos.format('YYYY-MM-DD HH:mm:ss'),horaactual.format('YYYY-MM-DD HH:mm:ss')]
    console.log(values)
    con.query(sql, values, function (err, result) {            
      if (err) throw err;
        console.log(result)
        if(result.length > 0){
          res.json(0)
        }else{
          con.connect(function(err) {
            if (err) throw err;
            var sql = "SELECT cliente.identificacion AS identificacion,mesa.id_mesa AS id_mesa, DATE_FORMAT(reserva.hora_reserva,'%Y-%m-%d %H:%i:%s') AS hora_reserva FROM reserva JOIN cliente ON cliente.identificacion = reserva.identificacion JOIN mesa ON mesa.id_mesa = reserva.id_mesa WHERE reserva.id_mesa = ? AND estado LIKE '%Pendiente%' AND reserva.hora_reserva BETWEEN ? AND ? ;";   
            var values = [numero_mesa,horaactual.format('YYYY-MM-DD HH:mm:ss'),horamas.format('YYYY-MM-DD HH:mm:ss')]
            con.query(sql, values, function (err, result) {
              if (err) throw err;
                console.log(result)
                if(result.length > 0){
                  res.json(0)
                }else{
                  con.connect(function(err) {
                    if (err) throw err;
                    var sql = "INSERT INTO cliente (identificacion,tipo_identificacion,nombre_cliente,celular,correo) VALUES (?);";
                    var values = [
                      [identificacion,tipo_identificacion,nombre_cliente,celular,correo]
                    ]
                    con.query(sql, values, function (err, result) {
                      if (err) throw err;
                      var sql = "INSERT INTO reserva (hora_reserva,id_mesa,estado,identificacion) VALUES (?);";
                      var values = [
                      [hora_reserva,numero_mesa, 'Pendiente' /* estado 1 es pendiente creado en la bd*/,identificacion]
                    ]
                    con.query(sql, values, function (err, result) {
                      if (err) throw err;
                      res.json("1 record inserted")        
                    });       
                    });
                  });  
                }                           
            });
          });          
        }
    });
  });  
        
})
  
//READ Solicitar Información
router.get('/', (req, res) => {
  
  con.connect(function(err) {
    if (err) throw err;    
    var sql = "SELECT reserva.id_reserva, mesa.id_mesa AS id_mesa,cliente.identificacion AS identificacion,cliente.tipo_identificacion AS tipo_identificacion,cliente.nombre_cliente AS nombre_cliente, cliente.nombre_cliente AS nombre_cliente, cliente.celular AS celular, mesa.numero_mesa AS numero_mesa, mesa.capacidad AS capacidad,DATE_FORMAT(reserva.hora_reserva,'%m/%d/%Y %h:%i %p') AS hora_reserva, estado  FROM reserva JOIN cliente ON cliente.identificacion = reserva.identificacion JOIN mesa ON mesa.id_mesa = reserva.id_mesa";
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.json(result)        
    });
  });   
})
  
//READ Solicitar Información de un producto
router.get('/:id_reserva', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    var sql = "SELECT reserva.id_reserva, cliente.identificacion AS identificacion, cliente.nombre_cliente AS nombre_cliente, cliente.celular AS celular, mesa.numero_mesa AS numero_mesa, DATE_FORMAT(reserva.hora_reserva,'%Y-%m-%d %H:%i:%s') AS hora_reserva, estado  FROM reserva JOIN cliente ON cliente.identificacion = reserva.identificacion JOIN mesa ON mesa.id_mesa = reserva.id_mesa WHERE id_reserva = ?;";   
    var values = [req.params.id_reserva]
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json(result)         
    });
  });   
})
  
//UPDATE actualizar información que ya existe
router.put('/:id_reserva', (req, res) => {  
    const nombre_cliente = req.body['nombre_cliente']
    const tipo_identificacion = req.body['tipo_identificacion']
    const identificacion = req.body['identificacion']
    const celular = req.body['celular']
    const correo = req.body['correo']
    const numero_mesa = req.body['numero_mesa']
    const hora_reserva = req.body['hora_reserva']
    const estado = req.body['estado']
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE reserva SET nombre_cliente = ?, tipo_identificacion = ?, identificacion = ?,celular = ? ,correo = ?, numero_mesa = ?, hora_reserva = ?, estado = ? WHERE id_reserva = ?; ";
    var values = [nombre_cliente, tipo_identificacion,identificacion,celular,correo,numero_mesa,hora_reserva,estado, req.params.id_reserva]      
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json("Number of records updated: " + result.affectedRows)        
    });
  });        
})

//UPDATE actualizar estado
router.put('/estado/:id_reserva', (req, res) => {  
  const estado = req.body['estado']
  console.log(req.body)
  con.connect(function(err) {
    if (err) throw err;
    var sql = "UPDATE reserva SET estado = ? WHERE id_reserva = ?; ";
    var values = [estado, req.params.id_reserva]      
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json("Number of records updated: " + result.affectedRows)        
    });
  });        
})
    
//DELETE Borrar información 
router.delete('/:id_reserva', (req, res) => {
  con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM reserva WHERE id_reserva = ?";
    var values = [req.params.id_reserva]      
    con.query(sql, values, function (err, result) {
      if (err) throw err;
      res.json("Number of records deleted: " + result.affectedRows)        
    });
  });   
})

module.exports = router
