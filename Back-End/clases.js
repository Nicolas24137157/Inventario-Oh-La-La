class cliente {
    constructor(identificacion,tipo_identificacion,nombre_cliente,celular,direccion,correo){
        this.identificacion = identificacion;
        this.tipo_identificacion = tipo_identificacion;
        this.nombre_cliente = nombre_cliente;
        this.celular = celular;
        this.direccion = direccion;
        this.correo = correo;
    }
}

// Función para convertir un objeto JSON en una instancia de la clase 
function jsonCliente(jsonData) {
    return new cliente(jsonData[0].identificacion, jsonData[0].tipo_identificacion, jsonData[0].nombre_cliente,
        jsonData[0].celular,jsonData[0].direccion,jsonData[0].correo);
}

class detalle_producto {
    constructor(id_detalle_producto,fecha_detalle,cantidad_usada,id_inventario,id_insumos,id_pedido,id_producto){
        this.id_detalle_producto = id_detalle_producto;
        this.fecha_detalle = fecha_detalle;
        this.cantidad_usada = cantidad_usada;
        this.id_inventario = id_inventario;
        this.id_insumos = id_insumos;
        this.id_pedido = id_pedido;
        this.id_producto = id_producto;
    }
}

function jsonDetalleProducto(jsonData) {
    return new detalle_producto(jsonData.id_detalle_producto, jsonData.fecha_detalle, jsonData.cantidad_usada,
        jsonData.id_inventario, jsonData.id_insumos, jsonData.id_pedido, jsonData.id_producto);
}


class devolucion {
    constructor(id_devolucion,id_tipo_devolucion,id_producto,numero_pedido,hora_devolucion,observacion){
        this.id_devolucion = id_devolucion;
        this.id_tipo_devolucion = id_tipo_devolucion;
        this.id_producto = id_producto;
        this.numero_pedido = numero_pedido;
        this.hora_devolucion = hora_devolucion;
        this.observacion = observacion;
    }
}

function jsonDevolucion(jsonData) {
    return new devolucion(jsonData.id_devolucion, jsonData.id_tipo_devolucion, jsonData.id_producto,
        jsonData.numero_pedido, jsonData.hora_devolucion, jsonData.observacion);
}

class estado {
    constructor(id_estado,descripcion){
        this.id_estado = id_estado;
        this.descripcion = descripcion;
    }
}

function jsonEstado(jsonData) {
    return new estado(jsonData.id_estado, jsonData.descripcion);
}

class excepciones {
    constructor(id_excepciones,id_insumos,numero_pedido,cantidad){
        this.id_excepciones = id_excepciones;
        this.id_insumos = id_insumos;
        this.numero_pedido = numero_pedido;
        this.cantidad = cantidad;
    }
}

function jsonExcepciones(jsonData) {
    return new excepciones(jsonData.id_excepciones, jsonData.id_insumos, jsonData.numero_pedido, jsonData.cantidad);
}

class insumos {
    constructor(id_insumos,nombre_insumo,fecha_caducidad){
        this.id_insumos = id_insumos;
        this.nombre_insumo = nombre_insumo;
        this.fecha_caducidad = fecha_caducidad;
    }
}

function jsonInsumos(jsonData) {
    return new insumos(jsonData.id_insumos, jsonData.nombre_insumo, jsonData.fecha_caducidad);
}

class inventario {
    constructor(id_inventario,unidad,cantidad,id_insumos,fecha_ingreso){
        this.id_inventario = id_inventario;
        this.unidad = unidad;
        this.cantidad = cantidad;
        this.id_insumos = id_insumos;
        this.fecha_ingreso = fecha_ingreso;
    }
}

function jsonInventario(jsonData) {
    return new inventario(jsonData.id_inventario, jsonData.unidad, jsonData.cantidad, jsonData.id_insumos, jsonData.fecha_ingreso);
}

class mesa {
    constructor(id_mesa,capacidad,numero_mesa){
        this.id_mesa = id_mesa;
        this.capacidad = capacidad;
        this.numero_mesa = numero_mesa;
    }
}

function jsonMesa(jsonData) {
    return new mesa(jsonData.id_mesa, jsonData.capacidad, jsonData.numero_mesa);
}

class pedido {
    constructor(id_pedido,numero_pedido,id_producto,id_estado,id_mesa){
        this.id_pedido = id_pedido;
        this.numero_pedido = numero_pedido;
        this.id_producto = id_producto;
        this.id_estado = id_estado;
        this.id_mesa = id_mesa;
    }
}

function jsonPedido(jsonData) {
    return new pedido(jsonData.id_pedido, jsonData.numero_pedido, jsonData.id_producto, jsonData.id_estado, jsonData.id_mesa);
}

class productos {
    constructor(id_producto,nombre_producto,precio,descripcion){
        this.id_producto = id_producto;
        this.nombre_producto = nombre_producto;
        this.precio = precio;
        this.descripcion = descripcion;
    }
}

function jsonProductos(jsonData) {
    return new productos(jsonData.id_producto, jsonData.nombre_producto, jsonData.precio, jsonData.descripcion);
}

class proveedores {
    constructor(id_proveedor,NIT,nombre_proveedor,celular,direccion){
        this.id_proveedor = id_proveedor;
        this.NIT = NIT;
        this.nombre_proveedor = nombre_proveedor;
        this.celular = celular;
        this.direccion = direccion;
    }
}

function jsonProveedores(jsonData) {
    return new proveedores(jsonData.id_proveedor, jsonData.NIT, jsonData.nombre_proveedor, jsonData.celular, jsonData.direccion);
}

class requisitos_productos {
    constructor(id_requisitos,id_producto,id_insumos,cantidad){
        this.id_requisitos = id_requisitos;
        this.id_producto = id_producto;
        this.id_insumos = id_insumos;
        this.cantidad = cantidad;
    }
}

function jsonRequisitosProductos(jsonData) {
    return new requisitos_productos(jsonData.id_requisitos, jsonData.id_producto, jsonData.id_insumos, jsonData.cantidad);
}

class reserva {
    constructor(id_reserva,hora_reserva,id_mesa,id_estado,identificacion){
        this.id_reserva = id_reserva;
        this.hora_reserva = hora_reserva;
        this.id_mesa = id_mesa;
        this.id_estado = id_estado;
        this.identificacion = identificacion;
    }
}

function jsonReserva(jsonData) {
    return new reserva(jsonData[0].id_reserva, jsonData[0].hora_reserva, jsonData[0].id_mesa, jsonData[0].id_estado, jsonData[0].identificacion);
}

class tipo_devolucion {
    constructor(id_tipo_devolucion,descripcion){
        this.id_tipo_devolucion = id_tipo_devolucion;
        this.descripcion = descripcion;
    }
}

function jsonTipoDevolucion(jsonData) {
    return new tipo_devolucion(jsonData.id_tipo_devolucion, jsonData.descripcion);
}

class venta {
    constructor(numero_etiqueta,fecha_venta,identificacion,numero_pedido){
        this.numero_etiqueta = numero_etiqueta;
        this.fecha_venta = fecha_venta;
        this.identificacion = identificacion;
        this.numero_pedido = numero_pedido;
    }
}

function jsonVenta(jsonData) {
    return new venta(jsonData.numero_etiqueta, jsonData.fecha_venta, jsonData.identificacion, jsonData.numero_pedido);
}

module.exports = {cliente,jsonCliente,detalle_producto,jsonDetalleProducto,devolucion,jsonDevolucion,estado,jsonEstado,excepciones,jsonExcepciones,
                  insumos,jsonInsumos,inventario,jsonInventario,mesa,jsonMesa,pedido,jsonPedido,productos,jsonProductos,proveedores,jsonProveedores
                  ,requisitos_productos,jsonRequisitosProductos,reserva,jsonReserva,tipo_devolucion,jsonTipoDevolucion,venta,jsonVenta}







