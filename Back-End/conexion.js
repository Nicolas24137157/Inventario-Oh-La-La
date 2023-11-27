const express = require('express')
const app = express()
const port = 3000
var cors = require ('cors')
const auth = require("./auth");
// npx nodemon conexion.js

app.use(express.json())
app.use(cors())

const productosRouter = require('./productos')
app.use('/productos', auth, productosRouter)

const insumosRouter = require('./insumos')
app.use('/insumos', auth, insumosRouter)

const proveedoresRouter = require('./proveedores')
app.use('/proveedores', auth, proveedoresRouter)

const mesaRouter = require('./mesa')
app.use('/mesa', auth, mesaRouter)

const reservas_mesasRouter = require('./reservas_mesas')
app.use('/reservas_mesas', auth, reservas_mesasRouter)

const loginRouter = require('./login')
app.use('/login', loginRouter)

const pedidosRouter = require('./pedidos')
app.use('/pedidos', pedidosRouter)

const devolucionesRouter = require('./devoluciones')
app.use('/devoluciones', devolucionesRouter)

const ventasRouter = require('./ventas')
app.use('/ventas', ventasRouter)

const inventarioRouter = require('./inventario')
app.use('/inventario', auth, inventarioRouter)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})