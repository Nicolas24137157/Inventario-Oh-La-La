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
      const id_mesa = req.body['id_mesa']
      const estado = 'Pendiente'
      const datos = req.body['datos']
      const identificacion = req.body['identificacion']
      const tipo_identificacion = req.body['tipo_identificacion']
      const nombre_cliente = req.body['nombre_cliente']
      console.log(datos)
      console.log("inteonto")
      con.connect(function(err) {
        if (err) throw err;
        if(datos.length > 0){

          var sql = "SELECT * FROM cliente WHERE identificacion = ?;";
          var values = [
            [identificacion]
          ];
                    
          con.query(sql, values, function (err, result) {
            if (err) throw err;
              if(result.length > 0){
                  res.json(0)  
              }
          });          

          var sql = "INSERT INTO cliente (identificacion,tipo_identificacion,nombre_cliente) VALUES (?);";
          var values = [
            [identificacion,tipo_identificacion,nombre_cliente]
          ];
                    
          con.query(sql, values, function (err, result) {
            if (err) throw err;
          });          

          datos.forEach(element => {
            var sql = "INSERT INTO pedido (id_mesa,id_producto,estado,precio_total,identificacion,tipo_pedido) VALUES (?);";
            var values = [
              [id_mesa,element.id_producto,estado,element.cantidad_subtotal,identificacion,'PEDIDO']
            ];
                      
            con.query(sql, values, function (err, result) {
              if (err) throw err;
            });          

            var sql = "SELECT id_pedido FROM pedido ORDER BY id_pedido DESC LIMIT 1   ";
            con.query(sql, function (err, result) {
              
              result.forEach(e => {
                var sql = "INSERT INTO productos_pedido (id_producto,id_pedido,cantidad) VALUES (?);";
                var values = [
                  [element.id_producto,e.id_pedido,element.cantidad]
                ];

                console.log(e.id_pedido + 'holaaa')        

                con.query(sql, values, function (err, result) {
                  if (err) throw err;
                });                              
              });
            });           

          });
          res.json("1 record inserted")   
        }else{
          res.json(0)
        }        
      });    
  })
  
//pos Reserva Pedido

  //CREATE Enviar nueva Información
  router.post('/pedidoReserva/', (req, res) => {   
    const id_mesa = req.body['id_mesa']
    const estado = 'Pendiente'
    const datos = req.body['datos']
    const identificacion = req.body['identificacion']
    const tipo_identificacion = req.body['tipo_identificacion']
    const nombre_cliente = req.body['nombre_cliente']
    console.log(datos)
    console.log("inteonto")
    con.connect(function(err) {
      if (err) throw err;
      if(datos.length > 0){

        datos.forEach(element => {
          var sql = "INSERT INTO pedido (id_mesa,id_producto,estado,precio_total,identificacion,tipo_pedido) VALUES (?);";
          var values = [
            [id_mesa,element.id_producto,estado,element.cantidad_subtotal,identificacion,'PEDIDO_RESERVA']
          ];
                    
          con.query(sql, values, function (err, result) {
            if (err) throw err;
          });          

          var sql = "SELECT id_pedido FROM pedido ORDER BY id_pedido DESC LIMIT 1   ";
          con.query(sql, function (err, result) {
            
            result.forEach(e => {
              var sql = "INSERT INTO productos_pedido (id_producto,id_pedido,cantidad) VALUES (?);";
              var values = [
                [element.id_producto,e.id_pedido,element.cantidad]
              ];

              console.log(e.id_pedido + 'holaaa')        

              con.query(sql, values, function (err, result) {
                if (err) throw err;
              });                              
            });
          });           

        });
        res.json("1 record inserted")   
      }else{
        res.json(0)
      }        
    });    
})



//DOMICILIOS
router.post('/pedidodomicilio', (req, res) => {   
  const id_pedido = req.body['id_pedido']
  const identificacion =req.body ['identificacion']
  const tipo_identificacion =req.body ['tipo_identificacion']
  const nombre_cliente =req.body ['nombre_cliente']
  const estado = 'Pendiente'
  const datos = req.body['datos']
  const celular = req.body['celular']
  const direccion = req.body['direccion']


  con.connect(function(err) {
    if (err) throw err;
    if(datos.length > 0){      
      var sql = "SELECT * FROM cliente WHERE identificacion = ?;";
      var values = [
        [identificacion]
      ];
                
      con.query(sql, values, function (err, result) {
        if (err) throw err;
          if(result.length > 0){
              res.json(0)  
          }
      });          

      var sql = "INSERT INTO cliente (identificacion,tipo_identificacion,nombre_cliente,direccion,celular) VALUES (?);";
      var values = [
        [identificacion,tipo_identificacion,nombre_cliente,direccion,celular]
      ];
                
      con.query(sql, values, function (err, result) {
        if (err) throw err;
      });   

      datos.forEach(element => {
        
      var sql = "SELECT id_pedido FROM pedido ORDER BY id_pedido DESC LIMIT 1   ";
      con.query(sql, function (err, result) {
        
        result.forEach(e => {
          var sql = "INSERT INTO productos_pedido (id_producto,id_pedido,cantidad) VALUES (?);";
          var values = [
            [element.id_producto,e.id_pedido,element.cantidad]
          ];

          con.query(sql, values, function (err, result) {
            if (err) throw err;
          });                              
        });
      });           

        var sql = "INSERT INTO pedido (id_producto,estado,identificacion,precio_total,tipo_pedido) VALUES (?);";
        var values = [
          [element.id_producto,estado,identificacion,element.cantidad_subtotal, 'DOMICILIO']
        ];
                  
        con.query(sql, values, function (err, result) {
          if (err) throw err;
        });          
      });
      res.json("1 record inserted")        
    }else{
      res.json("0")        
    }        
  });    
})


  //READ Solicitar Información
  router.get('/', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT pedido.id_pedido,productos_pedido.cantidad AS cantidad, productos.nombre_producto AS nombre_producto,cliente.nombre_cliente AS nombre_cliente,cliente.identificacion AS identificacion,mesa.numero_mesa AS numero_mesa,pedido.estado AS estado FROM pedido JOIN productos ON productos.id_producto = pedido.id_producto JOIN mesa ON mesa.id_mesa = pedido.id_mesa JOIN cliente ON cliente.identificacion = pedido.identificacion JOIN productos_pedido ON productos_pedido.id_pedido = pedido.id_pedido ";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //READ DOMICILIO Solicitar Información
  router.get('/domicilio', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT pedido.id_pedido,productos_pedido.cantidad AS cantidad, productos.nombre_producto AS nombre_producto,cliente.nombre_cliente AS nombre_cliente,cliente.direccion AS direccion,cliente.celular AS celular,cliente.identificacion AS identificacion,pedido.estado AS estado FROM pedido JOIN productos ON productos.id_producto = pedido.id_producto JOIN cliente ON cliente.identificacion = pedido.identificacion JOIN productos_pedido ON productos_pedido.id_pedido = pedido.id_pedido WHERE tipo_pedido LIKE '%DOMICILIO%' ";
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  

  //READ Solicitar Información de un producto
  router.get('/:id_pedido', (req, res) => {
    con.connect(function(err) {
      if (err) throw err;    
      var sql = "SELECT * FROM productos WHERE id_pedido = ?;";
      var values = [req.params.id_producto]
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json(result)        
      });
    });   
  })
  
  //UPDATE actualizar información que ya existe
  router.put('/:id_pedido', (req, res) => {  
    const id_pedido = req.body['id_pedido']
    const id_estado = req.body['id_estado']
    con.connect(function(err) {
      if (err) throw err;
      var sql = "UPDATE pedido SET id_pedido = ?, id_estado = ? WHERE id_producto = ?; ";
      var values = [id_pedido,numero_pedido,id_estado, req.params.id_producto]      
      con.query(sql, values, function (err, result) {
        if (err) throw err;
        res.json("Number of records updated: " + result.affectedRows)        
      });
    });        
  })
    
  //UPDATE actualizar estado
  router.put('/estado/:id_pedido', (req, res) => {  
    const estado = req.body['estado']
    const identificacion = req.body['identificacion']
    con.connect(function(err) {
      var sql = "UPDATE pedido SET estado = ? WHERE id_pedido = ?; ";
      var values = [estado, req.params.id_pedido]      
      con.query(sql, values, function (err, resultpedido) {
        if (estado == 'Finalizada') {
          var sql = "SELECT id_pedido,id_producto FROM pedido WHERE identificacion = ?; ";
          var values = [
            [identificacion]
          ];
          con.query(sql, values, function (err, resultp) {
              var sql = "INSERT INTO ventas (fecha_venta,identificacion) VALUES (?,?);";        
              const fechaActual = new Date();
              const fechaFormateada = fechaActual.toISOString().slice(0, 19).replace('T', ' ');
              var values = [ fechaFormateada,identificacion]      

              con.query(sql, values, function (err, result) {
                resultp.forEach(x => {
                  var sql = "SELECT numero_etiqueta FROM ventas ORDER BY numero_etiqueta DESC LIMIT 1   ";
                  con.query(sql, function (err, result) {              
                  result.forEach(e => {      
                  var sql = "UPDATE pedido SET numero_etiqueta = ? WHERE id_pedido = ? ";        
                  var values = [ e.numero_etiqueta, x.id_pedido] 
                  con.query(sql, values, function (err, result) {
                  })
                    var sql = "SELECT id_insumos,cantidad FROM requisitos_productos WHERE id_producto = ?";
                    var values = [x.id_producto]
                    console.log("Entrooo")
                    con.query(sql, values, function (err, resultadoconsumo)
                    {
                      console.log("Entrooo2")
                      console.log(resultadoconsumo)
    
                      //Se Debe Restar De La SIguiente Lote
                      for (let index = 0; index < resultadoconsumo.length; index++) 
                      {
                        console.log("ENENENENE")
                        console.log(resultadoconsumo.length) 
                        console.log( resultadoconsumo[index]) 
                        var sql = "SELECT id_insumos,cantidad,id_lote FROM inventario WHERE id_insumos = ? AND cantidad > 0";
                        var values = [ resultadoconsumo[index].id_insumos,resultadoconsumo[index].cantidad]   
                        con.query(sql, values, function (err, resultadoinventario) {
                        console.log( resultadoconsumo[index].id_insumos + "ENotrosdss")
                        
                        const resultado = resultadoconsumo[index].cantidad
                        for (let index2 = 0; index2 < resultadoinventario.length; index2++) {
                          console.log(resultadoinventario);
                          console.log(resultadoinventario.length + "Tamaño");                          
                          console.log(resultadoinventario[index]);                          
                          resultado = resultadoinventario[index].cantidad - resultado;
                          console.log(resultado + " resultado" + resultadoinventario[index].cantidad + " ElementINVe " + resultadoconsumo[index].cantidad + " ElementC ")
                          if(resultado < 0){
                            var sql = "UPDATE inventario SET cantidad = 0 WHERE id_lote = ? ";        
                            var values = [ resultadoinventario[index].id_lote] 
                            con.query(sql, values, function (err, result) {
                              console.log("Acabado")
                            });  
                          }
                          else{
                            var sql = "UPDATE inventario SET cantidad = ? WHERE id_lote = ? ";        
                            console.log(resultadoinventario[index].id_lote + "idlotee")
                            var values = [ resultado,resultadoinventario[index].id_lote] 
                            con.query(sql, values, function (err, result) {
                              console.log("cantidadresul")
                            });
                            break;                              
                          }   
                        }
                      })
                    }
                    if (err) throw err;
                    res.json("Number of records updated: ")     
                    return;       
                  })
                })
              })          
            })
          })      
        })
      }
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