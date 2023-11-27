-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.1.0 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para inventario_ohlala
CREATE DATABASE IF NOT EXISTS `inventario_ohlala` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `inventario_ohlala`;

-- Volcando estructura para tabla inventario_ohlala.cliente
CREATE TABLE IF NOT EXISTS `cliente` (
  `tipo_identificacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nombre_cliente` varchar(50) NOT NULL DEFAULT '',
  `celular` bigint DEFAULT '0',
  `direccion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `correo` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `identificacion` bigint DEFAULT NULL,
  PRIMARY KEY (`id_cliente`),
  KEY `identificacion` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.cliente: ~7 rows (aproximadamente)
INSERT INTO `cliente` (`tipo_identificacion`, `nombre_cliente`, `celular`, `direccion`, `correo`, `id_cliente`, `identificacion`) VALUES
	('CC', 'Sebastian Barona', 3242534665, NULL, 'nicolasvr24137@gmail.com', 49, 23546457587),
	('CC', 'Nicolás Felipe Victoria Rodríguez', 0, NULL, NULL, 50, 1070626166),
	('', 'Maria Castro', 34356775536, 'cll25445', NULL, 51, 105767453545),
	('CC', 'Andres Perez', 342564657457, 'cll34254', NULL, 52, 105657547),
	('CC', 'Fredy Ortiz', 0, NULL, NULL, 53, 10706364578),
	('CC', 'Pepito Perez', 314345475768, NULL, 'nicolasvr24137@gmail.com', 54, 235465768878),
	('CC', 'Jaime gonzalez', 0, NULL, NULL, 55, 436567467878),
	('CC', 'Alberto Rodriguez', 34235436456, NULL, 'nicolasvr24137@gmail.com', 56, 42354365477),
	('CC', 'Pepito Rodriguez', 353453656, NULL, 'nicolasvr24137@gmail.com', 57, 25243367658578);

-- Volcando estructura para tabla inventario_ohlala.detalle_producto
CREATE TABLE IF NOT EXISTS `detalle_producto` (
  `id_detalle_producto` int NOT NULL AUTO_INCREMENT,
  `fecha_detalle` date DEFAULT NULL,
  `cantidad_usada` double DEFAULT NULL,
  `id_inventario` int DEFAULT NULL,
  `id_insumos` int DEFAULT NULL,
  `id_pedido` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  PRIMARY KEY (`id_detalle_producto`) USING BTREE,
  KEY `FK_detalle_producto_inventario` (`id_inventario`),
  KEY `FK_detalle_producto_insumos` (`id_insumos`),
  KEY `FK_detalle_producto_pedido` (`id_pedido`),
  KEY `FK_detalle_producto_productos` (`id_producto`),
  CONSTRAINT `FK_detalle_producto_insumos` FOREIGN KEY (`id_insumos`) REFERENCES `insumos` (`id_insumos`),
  CONSTRAINT `FK_detalle_producto_inventario` FOREIGN KEY (`id_inventario`) REFERENCES `inventario` (`id_lote`),
  CONSTRAINT `FK_detalle_producto_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `FK_detalle_producto_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.detalle_producto: ~0 rows (aproximadamente)

-- Volcando estructura para tabla inventario_ohlala.devolucion_plato
CREATE TABLE IF NOT EXISTS `devolucion_plato` (
  `id_devolucion` int NOT NULL AUTO_INCREMENT,
  `numero_etiqueta` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `hora_devolucion` datetime DEFAULT NULL,
  `observacion` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`id_devolucion`),
  KEY `FK_devolucion_productos` (`id_producto`),
  KEY `FK_devolucion_pedido` (`numero_etiqueta`) USING BTREE,
  CONSTRAINT `FK_devolucion_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.devolucion_plato: ~0 rows (aproximadamente)
INSERT INTO `devolucion_plato` (`id_devolucion`, `numero_etiqueta`, `id_producto`, `hora_devolucion`, `observacion`) VALUES
	(12, 63, 1, '2023-11-27 14:58:42', 'Devuelvo el arroz con Pollo por que llegó defectuoso'),
	(13, 63, 1, '2023-11-27 15:16:15', 'Devuelvo el arroz con pollo por motivos de higiene y porque llegó defectuoso');

-- Volcando estructura para tabla inventario_ohlala.excepciones
CREATE TABLE IF NOT EXISTS `excepciones` (
  `id_excepciones` int NOT NULL AUTO_INCREMENT,
  `id_insumos` int NOT NULL DEFAULT '0',
  `id_pedido` int NOT NULL DEFAULT '0',
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_excepciones`),
  KEY `FK_excepciones_insumos` (`id_insumos`),
  KEY `FK_excepciones_pedido` (`id_pedido`) USING BTREE,
  CONSTRAINT `FK_excepciones_insumos` FOREIGN KEY (`id_insumos`) REFERENCES `insumos` (`id_insumos`),
  CONSTRAINT `FK_excepciones_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.excepciones: ~0 rows (aproximadamente)

-- Volcando estructura para tabla inventario_ohlala.insumos
CREATE TABLE IF NOT EXISTS `insumos` (
  `id_insumos` int NOT NULL AUTO_INCREMENT,
  `nombre_insumo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_insumos`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.insumos: ~8 rows (aproximadamente)
INSERT INTO `insumos` (`id_insumos`, `nombre_insumo`) VALUES
	(1, 'Aguacates'),
	(2, 'Salchichas'),
	(3, 'Lechuga'),
	(5, 'Mortadela Zenú'),
	(6, 'Huevos'),
	(13, 'test mod');

-- Volcando estructura para tabla inventario_ohlala.inventario
CREATE TABLE IF NOT EXISTS `inventario` (
  `id_lote` int NOT NULL AUTO_INCREMENT,
  `id_insumos` int DEFAULT NULL,
  `cantidad` double DEFAULT NULL,
  `unidad` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `id_proveedor` int DEFAULT NULL,
  PRIMARY KEY (`id_lote`) USING BTREE,
  KEY `FK_inventario_insumos` (`id_insumos`),
  KEY `FK_inventario_proovedor` (`id_proveedor`) USING BTREE,
  CONSTRAINT `FK_inventario_insumos` FOREIGN KEY (`id_insumos`) REFERENCES `insumos` (`id_insumos`),
  CONSTRAINT `FK_inventario_proovedor` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.inventario: ~2 rows (aproximadamente)
INSERT INTO `inventario` (`id_lote`, `id_insumos`, `cantidad`, `unidad`, `fecha_ingreso`, `fecha_caducidad`, `id_proveedor`) VALUES
	(1, 6, 12, 'unidades', '2023-11-08', NULL, 5),
	(2, 6, 2, 'Unidades', '2023-11-08', '2023-11-27', 5),
	(6, 5, 5, 'Kilogramos', '2023-11-22', '2023-11-22', 1),
	(7, 1, 5, 'Arroba', '2023-11-22', '2023-11-22', 1),
	(9, 3, 0, '', '2023-11-13', '2023-11-09', 1),
	(10, 2, 0, 'Lts', '2023-11-22', '2023-11-24', 1),
	(11, 5, 0, '', '2023-11-22', '2023-11-10', 1),
	(12, 2, 0, '', '2023-11-22', '2023-11-22', 1),
	(14, 2, 4, 'Unidades', '2023-11-27', '2023-11-16', 5);

-- Volcando estructura para tabla inventario_ohlala.mesa
CREATE TABLE IF NOT EXISTS `mesa` (
  `id_mesa` int NOT NULL AUTO_INCREMENT,
  `capacidad` int NOT NULL,
  `numero_mesa` int DEFAULT NULL,
  PRIMARY KEY (`id_mesa`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.mesa: ~3 rows (aproximadamente)
INSERT INTO `mesa` (`id_mesa`, `capacidad`, `numero_mesa`) VALUES
	(2, 6, 5),
	(3, 3, 7),
	(4, 5, 8),
	(5, 3, 18),
	(6, 6, 20),
	(7, 8, 17),
	(8, 7, 13),
	(9, 4, 12),
	(10, 6, 20),
	(11, 4, 32),
	(12, 3, 16);

-- Volcando estructura para tabla inventario_ohlala.pedido
CREATE TABLE IF NOT EXISTS `pedido` (
  `id_pedido` int NOT NULL AUTO_INCREMENT,
  `id_mesa` int DEFAULT NULL,
  `id_producto` int DEFAULT NULL,
  `identificacion` bigint DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `precio_total` int DEFAULT NULL,
  `tipo_pedido` varchar(50) DEFAULT NULL,
  `numero_etiqueta` int DEFAULT NULL,
  PRIMARY KEY (`id_pedido`),
  KEY `FK_pedido_mesa` (`id_mesa`),
  KEY `FK_pedido_productos` (`id_producto`),
  KEY `FK_pedido_cliente` (`identificacion`),
  CONSTRAINT `FK_pedido_cliente` FOREIGN KEY (`identificacion`) REFERENCES `cliente` (`identificacion`),
  CONSTRAINT `FK_pedido_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `mesa` (`id_mesa`),
  CONSTRAINT `FK_pedido_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.pedido: ~9 rows (aproximadamente)
INSERT INTO `pedido` (`id_pedido`, `id_mesa`, `id_producto`, `identificacion`, `estado`, `precio_total`, `tipo_pedido`, `numero_etiqueta`) VALUES
	(87, 7, 2, 1070626166, 'Finalizada', 45000, 'PEDIDO', 65),
	(88, 7, 13, 1070626166, 'Finalizada', 17000, 'PEDIDO', 65),
	(89, 8, 2, 23546457587, 'Finalizada', 45000, 'PEDIDO_RESERVA', 70),
	(90, 8, 13, 23546457587, 'Finalizada', 34000, 'PEDIDO_RESERVA', 70),
	(91, NULL, 2, 105767453545, 'Finalizada', 30000, 'DOMICILIO', 68),
	(92, NULL, 1, 105657547, 'Pendiente', 15000, 'DOMICILIO', 13),
	(93, 5, 1, 10706364578, 'Finalizada', 15000, 'PEDIDO', 63),
	(94, 4, 1, 436567467878, 'Finalizada', 15000, 'PEDIDO', 69),
	(95, 8, 1, 23546457587, 'Finalizada', 15000, 'PEDIDO_RESERVA', 70),
	(96, 11, 1, 42354365477, 'Finalizada', 15000, 'PEDIDO_RESERVA', 71),
	(97, 12, 1, 25243367658578, 'Finalizada', 15000, 'PEDIDO_RESERVA', 72);

-- Volcando estructura para tabla inventario_ohlala.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `id_producto` int NOT NULL AUTO_INCREMENT,
  `nombre_producto` varchar(45) NOT NULL,
  `precio` double NOT NULL DEFAULT (0),
  `descripcion` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.productos: ~8 rows (aproximadamente)
INSERT INTO `productos` (`id_producto`, `nombre_producto`, `precio`, `descripcion`) VALUES
	(1, 'Arroz con Pollo ', 15000, 'Arroz con Pollo y papas a la francesa'),
	(2, 'Salchipapa', 15000, 'papa, salchicha, chorizo'),
	(13, 'Fideos', 17000, 'dcsdfsdfd'),
	(14, 'Arroz con Camarones ', 15000, 'Arroz con Pollo y papas a la francesa'),
	(23, 'Aguacatesjknjk', 111, 'sadasdas'),
	(25, 'Hamburgues de Pollo ', 15000, 'Pan Bimbo, Queso Mozarella, Trozos de Pollo'),
	(27, 'Crepe de Queso', 15000, 'Crepe de queso estofado con otras cosas'),
	(28, 'Crepe de Carne a la Boloñesa', 17000, 'Crepe, con queso Mozarella, Carne desmechada, y salchichas'),
	(29, 'arroz chino ', 12000, 'arroz chinco con papas a la francesa');

-- Volcando estructura para tabla inventario_ohlala.productos_pedido
CREATE TABLE IF NOT EXISTS `productos_pedido` (
  `id_producto` int NOT NULL,
  `id_pedido` int NOT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_producto`,`id_pedido`),
  KEY `FK_pedido` (`id_pedido`),
  KEY `FK_producto` (`id_producto`),
  CONSTRAINT `FK_pedido` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
  CONSTRAINT `FK_producto` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.productos_pedido: ~2 rows (aproximadamente)
INSERT INTO `productos_pedido` (`id_producto`, `id_pedido`, `cantidad`) VALUES
	(1, 91, 1),
	(1, 93, 1),
	(1, 94, 1),
	(1, 95, 1),
	(1, 96, 1),
	(1, 97, 1),
	(2, 87, 3),
	(2, 89, 3),
	(2, 90, 2),
	(13, 88, 1),
	(13, 90, 2);

-- Volcando estructura para tabla inventario_ohlala.proveedores
CREATE TABLE IF NOT EXISTS `proveedores` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `NIT` bigint DEFAULT NULL,
  `nombre_proveedor` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `celular` bigint DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.proveedores: ~1 rows (aproximadamente)
INSERT INTO `proveedores` (`id_proveedor`, `NIT`, `nombre_proveedor`, `celular`, `direccion`) VALUES
	(1, 355464666, 'Andrés Lopez', 3132487205, 'Calle 1A # 8-85 Buenos Aires '),
	(5, 35747658, 'Alberto Suarez', 34354466, 'calle 4A # Barrio Las Palmas');

-- Volcando estructura para tabla inventario_ohlala.requisitos_productos
CREATE TABLE IF NOT EXISTS `requisitos_productos` (
  `id_requisitos` int NOT NULL AUTO_INCREMENT,
  `id_producto` int DEFAULT NULL,
  `id_insumos` int DEFAULT NULL,
  `cantidad` int DEFAULT NULL,
  PRIMARY KEY (`id_requisitos`),
  KEY `FK_requisitos_productos_productos` (`id_producto`),
  KEY `FK_requisitos_productos_insumos` (`id_insumos`),
  CONSTRAINT `FK_requisitos_productos_insumos` FOREIGN KEY (`id_insumos`) REFERENCES `insumos` (`id_insumos`),
  CONSTRAINT `FK_requisitos_productos_productos` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.requisitos_productos: ~2 rows (aproximadamente)
INSERT INTO `requisitos_productos` (`id_requisitos`, `id_producto`, `id_insumos`, `cantidad`) VALUES
	(1, 1, 5, 1),
	(2, 1, 6, 4),
	(3, 23, 3, 11),
	(4, 23, 1, 2),
	(5, 27, 3, 3),
	(6, 28, 3, 2),
	(7, 29, 3, 3);

-- Volcando estructura para tabla inventario_ohlala.reserva
CREATE TABLE IF NOT EXISTS `reserva` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `hora_reserva` datetime NOT NULL,
  `identificacion` bigint DEFAULT NULL,
  `id_mesa` int DEFAULT NULL,
  `estado` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'Pendiente',
  PRIMARY KEY (`id_reserva`),
  KEY `FK_reserva_mesa` (`id_mesa`),
  KEY `FK_reserva_cliente` (`identificacion`),
  CONSTRAINT `FK_reserva_cliente` FOREIGN KEY (`identificacion`) REFERENCES `cliente` (`identificacion`),
  CONSTRAINT `FK_reserva_mesa` FOREIGN KEY (`id_mesa`) REFERENCES `mesa` (`id_mesa`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla inventario_ohlala.reserva: ~4 rows (aproximadamente)
INSERT INTO `reserva` (`id_reserva`, `hora_reserva`, `identificacion`, `id_mesa`, `estado`) VALUES
	(41, '2023-11-26 20:43:00', 23546457587, 8, 'Pendiente'),
	(42, '2023-11-27 09:13:00', 235465768878, 10, 'Finalizada'),
	(43, '2023-11-27 09:53:00', 42354365477, 11, 'Pendiente'),
	(44, '2023-11-27 10:12:00', 25243367658578, 12, 'Pendiente');

-- Volcando estructura para tabla inventario_ohlala.ventas
CREATE TABLE IF NOT EXISTS `ventas` (
  `numero_etiqueta` int NOT NULL AUTO_INCREMENT,
  `fecha_venta` date DEFAULT NULL,
  `identificacion` bigint DEFAULT NULL,
  PRIMARY KEY (`numero_etiqueta`),
  KEY `FK_venta_cliente` (`identificacion`) USING BTREE,
  CONSTRAINT `FK_venta_cliente` FOREIGN KEY (`identificacion`) REFERENCES `cliente` (`identificacion`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Aqui va las ventas y el historial de ventas que se le agrega el mes de algún producto o plato de comida vendido';

-- Volcando datos para la tabla inventario_ohlala.ventas: ~0 rows (aproximadamente)
INSERT INTO `ventas` (`numero_etiqueta`, `fecha_venta`, `identificacion`) VALUES
	(50, '2023-11-27', 10706364578),
	(51, '2023-11-27', 10706364578),
	(52, '2023-11-27', 10706364578),
	(53, '2023-11-27', 10706364578),
	(54, '2023-11-27', 10706364578),
	(55, '2023-11-27', 10706364578),
	(56, '2023-11-27', 10706364578),
	(57, '2023-11-27', 10706364578),
	(58, '2023-11-27', 10706364578),
	(59, '2023-11-27', 10706364578),
	(60, '2023-11-27', 10706364578),
	(61, '2023-11-27', 10706364578),
	(62, '2023-11-27', 10706364578),
	(63, '2023-11-27', 10706364578),
	(64, '2023-11-27', 1070626166),
	(65, '2023-11-27', 1070626166),
	(66, '2023-11-27', 23546457587),
	(67, '2023-11-27', 23546457587),
	(68, '2023-11-27', 105767453545),
	(69, '2023-11-27', 436567467878),
	(70, '2023-11-27', 23546457587),
	(71, '2023-11-27', 42354365477),
	(72, '2023-11-27', 25243367658578);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
