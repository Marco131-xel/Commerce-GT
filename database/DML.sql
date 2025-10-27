-- crear base de datos
CREATE DATABASE commerce;

-- usuarios
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    tipo_usuario VARCHAR(20) CHECK (tipo_usuario IN ('COMUN', 'MODERADOR', 'LOGISTICA', 'ADMINISTRADOR')) DEFAULT 'COMUN',
    estado VARCHAR(15) CHECK (estado IN ('ACTIVO','SUSPENDIDO')) DEFAULT 'ACTIVO',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tarjeta
CREATE TABLE tarjetas (
    id_tarjeta SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    numero_tarjeta VARCHAR(20) NOT NULL,
    nombre_titular VARCHAR(100) NOT NULL,
    fecha_expiracion VARCHAR(7) NOT NULL,
    cvv VARCHAR(4) NOT NULL
);

-- categorias
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

-- productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_categoria INT NOT NULL REFERENCES categorias(id_categoria),
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    imagen_url TEXT,
    precio NUMERIC(10,2) NOT NULL CHECK (precio > 0),
    stock INT NOT NULL CHECK (stock >= 1),
    estado_producto VARCHAR(10) CHECK (estado_producto IN ('NUEVO','USADO')) NOT NULL,
    estado_revision VARCHAR(15) CHECK (estado_revision IN ('PENDIENTE','APROBADO','RECHAZADO')) DEFAULT 'PENDIENTE',
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- sanciones
CREATE TABLE sanciones (
    id_sancion SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_moderador INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    motivo TEXT NOT NULL,
    fecha_sancion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(15) CHECK (estado IN ('ACTIVA','LEVANTADA')) DEFAULT 'ACTIVA'
);

-- carritos
CREATE TABLE carritos (
    id_carrito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(15) CHECK (estado IN ('ACTIVO','PAGADO')) DEFAULT 'ACTIVO'
);

CREATE TABLE carrito_detalle (
    id_detalle SERIAL PRIMARY KEY,
    id_carrito INT NOT NULL REFERENCES carritos(id_carrito) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES productos(id_producto),
    cantidad INT NOT NULL CHECK (cantidad > 0)
);

-- pedidos
CREATE TABLE pedidos (
    id_pedido SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario),
    id_tarjeta INT REFERENCES tarjetas(id_tarjeta),
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_entrega_estimada DATE,
    estado VARCHAR(15) CHECK (estado IN ('EN_CURSO','ENTREGADO')) DEFAULT 'EN_CURSO',
    total NUMERIC(10,2) CHECK (total >= 0)
);

CREATE TABLE pedido_detalle (
    id_detalle SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES productos(id_producto),
    cantidad INT NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(10,2) NOT NULL CHECK (precio_unitario > 0),
    subtotal NUMERIC(10,2) GENERATED ALWAYS AS (cantidad * precio_unitario) STORED
);

-- ratings
CREATE TABLE ratings (
    id_rating SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_producto INT NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
    calificacion INT CHECK (calificacion BETWEEN 1 AND 5),
    comentario TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- logistica
CREATE TABLE logistica (
    id_logistica SERIAL PRIMARY KEY,
    id_pedido INT NOT NULL REFERENCES pedidos(id_pedido) ON DELETE CASCADE,
    id_usuario_logistica INT NOT NULL REFERENCES usuarios(id_usuario),
    fecha_modificacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nueva_fecha_entrega DATE,
    observacion TEXT
);

-- Insertar usuarios con correos @gmail.com y contraseñas bcrypt

INSERT INTO usuarios (nombre, apellido, correo, contrasena, telefono, direccion, tipo_usuario, estado) VALUES 
-- 10 usuarios comunes
('Juan', 'Pérez', 'juan.perez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0101', 'Calle Falsa 123, Ciudad A', 'COMUN', 'ACTIVO'),
('María', 'Gómez', 'maria.gomez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0102', 'Av. Siempre Viva 456, Ciudad B', 'COMUN', 'ACTIVO'),
('Carlos', 'López', 'carlos.lopez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0103', 'Calle Real 789, Ciudad C', 'COMUN', 'ACTIVO'),
('Ana', 'Martínez', 'ana.martinez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0104', 'Av. Central 321, Ciudad D', 'COMUN', 'ACTIVO'),
('Luis', 'Rodríguez', 'luis.rodriguez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0105', 'Calle Norte 654, Ciudad E', 'COMUN', 'ACTIVO'),
('Sofia', 'Hernández', 'sofia.hernandez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0106', 'Av. Sur 987, Ciudad F', 'COMUN', 'ACTIVO'),
('Diego', 'García', 'diego.garcia@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0107', 'Calle Este 147, Ciudad G', 'COMUN', 'ACTIVO'),
('Laura', 'Díaz', 'laura.diaz@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0108', 'Av. Oeste 258, Ciudad H', 'COMUN', 'ACTIVO'),
('Pedro', 'Sánchez', 'pedro.sanchez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0109', 'Calle Principal 369, Ciudad I', 'COMUN', 'ACTIVO'),
('Elena', 'Ramírez', 'elena.ramirez@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0110', 'Av. Secundaria 741, Ciudad J', 'COMUN', 'ACTIVO'),

-- 5 moderadores
('Miguel', 'Torres', 'miguel.torres@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0201', 'Av. Moderación 111, Ciudad K', 'MODERADOR', 'ACTIVO'),
('Carmen', 'Vargas', 'carmen.vargas@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0202', 'Calle Revisión 222, Ciudad L', 'MODERADOR', 'ACTIVO'),
('Roberto', 'Castro', 'roberto.castro@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0203', 'Av. Aprobación 333, Ciudad M', 'MODERADOR', 'ACTIVO'),
('Isabel', 'Rojas', 'isabel.rojas@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0204', 'Calle Control 444, Ciudad N', 'MODERADOR', 'ACTIVO'),
('Fernando', 'Mendoza', 'fernando.mendoza@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0205', 'Av. Supervisión 555, Ciudad O', 'MODERADOR', 'ACTIVO'),

-- 3 usuarios de logística
('Andrea', 'Silva', 'andrea.silva@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0301', 'Calle Distribución 666, Ciudad P', 'LOGISTICA', 'ACTIVO'),
('Javier', 'Ortega', 'javier.ortega@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0302', 'Av. Transporte 777, Ciudad Q', 'LOGISTICA', 'ACTIVO'),
('Patricia', 'Navarro', 'patricia.navarro@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0303', 'Calle Entrega 888, Ciudad R', 'LOGISTICA', 'ACTIVO'),

-- 1 administrador
('Admin', 'Principal', 'admin@gmail.com', '$2a$10$1N7CNyM8evwqM5aG6P2CeOlGVH1rKuVrM0xMM62URKqPK4NRyE1Hu', '555-0001', 'Av. Administración 999, Ciudad S', 'ADMINISTRADOR', 'ACTIVO');


-- Insertar tarjetas de crédito para los 10 usuarios comunes
INSERT INTO tarjetas (id_usuario, numero_tarjeta, nombre_titular, fecha_expiracion, cvv) VALUES 
-- Tarjeta para Juan Pérez (Usuario 1)
(1, '4532123456789012', 'JUAN PEREZ', '12/27', 123),
-- Tarjeta para María Gómez (Usuario 2)
(2, '4024007198765432', 'MARIA GOMEZ', '09/27', 789),
-- Tarjeta para Carlos López (Usuario 3)
(3, '4556123487654321', 'CARLOS LOPEZ', '02/27', 567),
-- Tarjeta para Ana Martínez (Usuario 4)
(4, '4916734589012345', 'ANA MARTINEZ', '08/27', 345),
-- Tarjeta para Luis Rodríguez (Usuario 5)
(5, '4485123498765432', 'LUIS RODRIGUEZ', '05/27', 901),
-- Tarjeta para Sofía Hernández (Usuario 6)
(6, '4539876543210987', 'SOFIA HERNANDEZ', '01/28', 567),
-- Tarjeta para Diego García (Usuario 7)
(7, '4555432167890123', 'DIEGO GARCIA', '03/28', 123),
-- Tarjeta para Laura Díaz (Usuario 8)
(8, '4921567834567890', 'LAURA DIAZ', '06/28', 789),
-- Tarjeta para Pedro Sánchez (Usuario 9)
(9, '4534678912345678', 'PEDRO SANCHEZ', '04/28', 345),
-- Tarjeta para Elena Ramírez (Usuario 10)
(10, '4556789012345678', 'ELENA RAMIREZ', '08/28', 901);

-- inserts para categorias
INSERT INTO categorias (nombre) VALUES 
('Tecnología'),
('Hogar'),
('Académico'),
('Personal'),
('Decoración'),
('Otro'),
('Salud'),
('Deportes'),
('Entretenimiento'),
('Moda'),
('Viajes'),
('Finanzas'),
('Comida'),
('Automóvil'),
('Mascotas'),
('Jardinería'),
('Arte'),
('Música'),
('Libros'),
('Trabajo');

-- Insertar productos para cada usuario común (10 productos por usuario)
INSERT INTO productos (id_usuario, id_categoria, nombre, descripcion, imagen_url, precio, stock, estado_producto, estado_revision) VALUES 
-- Productos para Juan Pérez (Usuario 1)
(1, 1, 'Laptop HP Pavilion', 'Laptop en excelente estado, 8GB RAM, 256GB SSD', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500', 1200.00, 1, 'USADO', 'APROBADO'),
(1, 1, 'iPhone 12 Pro', 'iPhone 12 Pro 128GB, color plata, sin rayones', 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', 800.00, 1, 'USADO', 'APROBADO'),
(1, 2, 'Sofá de 3 plazas', 'Sofá cómodo para sala, color gris', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 450.00, 1, 'USADO', 'APROBADO'),
(1, 3, 'Calculadora científica', 'Calculadora Texas Instruments TI-84 Plus', 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500', 80.00, 4, 'NUEVO', 'APROBADO'),
(1, 4, 'Reloj inteligente', 'Smartwatch Samsung Galaxy Watch', 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500', 150.00, 3, 'USADO', 'APROBADO'),
(1, 5, 'Lámpara de escritorio', 'Lámpara LED moderna, color negro', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500', 35.00, 6, 'NUEVO', 'APROBADO'),
(1, 7, 'Báscula digital', 'Báscula para baño, máxima precisión', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500', 25.00, 8, 'NUEVO', 'APROBADO'),
(1, 8, 'Pelota de fútbol', 'Pelota oficial tamaño 5, marca Adidas', 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=500', 30.00, 4, 'NUEVO', 'APROBADO'),
(1, 9, 'Auriculares Bluetooth', 'Auriculares inalámbricos, cancelación de ruido', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', 75.00, 3, 'USADO', 'APROBADO'),
(1, 10, 'Mochila para laptop', 'Mochila resistente al agua, compartimento acolchado', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 40.00, 6, 'NUEVO', 'APROBADO'),

-- Productos para María Gómez (Usuario 2)
(2, 2, 'Juego de sábanas', 'Juego de sábanas de algodón, tamaño queen', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 45.00, 4, 'NUEVO', 'APROBADO'),
(2, 3, 'Libro de matemáticas', 'Libro de cálculo diferencial e integral', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 35.00, 3, 'USADO', 'APROBADO'),
(2, 4, 'Perfume importado', 'Perfume francés, fragancia duradera', 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500', 60.00, 6, 'NUEVO', 'APROBADO'),
(2, 5, 'Cuadro decorativo', 'Pintura abstracta, marco de madera', 'https://images.unsplash.com/photo-1578321272175-bb6c6e8e2b1c?w=500', 55.00, 1, 'USADO', 'APROBADO'),
(2, 6, 'Kit de herramientas', 'Juego básico de herramientas para hogar', 'https://images.unsplash.com/photo-1572981779307-38f8b0456222?w=500', 85.00, 3, 'USADO', 'APROBADO'),
(2, 7, 'Termómetro digital', 'Termómetro infrarrojo sin contacto', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 40.00, 8, 'NUEVO', 'APROBADO'),
(2, 8, 'Raqueta de tenis', 'Raqueta profesional, grip nuevo', 'https://images.unsplash.com/photo-1622279457486-62dcc4a43126?w=500', 90.00, 4, 'USADO', 'APROBADO'),
(2, 9, 'Consola Nintendo Switch', 'Consola con 2 juegos incluidos', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', 280.00, 1, 'USADO', 'APROBADO'),
(2, 10, 'Zapatos deportivos', 'Tenis Nike talla 38, poco uso', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 65.00, 6, 'USADO', 'APROBADO'),
(2, 11, 'Maleta de viaje', 'Maleta rígida 28 pulgadas, 4 ruedas', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 120.00, 3, 'USADO', 'APROBADO'),

-- Productos para Carlos López (Usuario 3)
(3, 1, 'Tablet Samsung', 'Tablet Galaxy Tab A8, 64GB', 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500', 180.00, 4, 'USADO', 'APROBADO'),
(3, 2, 'Microondas', 'Horno microondas 1.2 pies cúbicos', 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=500', 100.00, 3, 'USADO', 'APROBADO'),
(3, 3, 'Diccionario inglés-español', 'Diccionario Larousse, edición 2022', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 25.00, 8, 'NUEVO', 'APROBADO'),
(3, 4, 'Cepillo eléctrico', 'Cepillo dental oral-b, 2 cabezales', 'https://images.unsplash.com/photo-162179148a9d1bb8e0b438d8d?w=500', 45.00, 6, 'USADO', 'APROBADO'),
(3, 5, 'Espejo de pared', 'Espejo decorativo 60x40cm, marco dorado', 'https://images.unsplash.com/photo-1552645265-3b9d3592a8e6?w=500', 70.00, 4, 'NUEVO', 'APROBADO'),
(3, 6, 'Extensión eléctrica', 'Regleta 6 entradas, protección contra picos', 'https://images.unsplash.com/photo-1565026057446-b39275d6d3e5?w=500', 20.00, 8, 'NUEVO', 'APROBADO'),
(3, 7, 'Tensiómetro digital', 'Monitor de presión arterial brazo', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 55.00, 6, 'NUEVO', 'APROBADO'),
(3, 8, 'Bicicleta de montaña', 'Bicicleta Trek, 21 velocidades', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500', 320.00, 1, 'USADO', 'APROBADO'),
(3, 9, 'Guitarra acústica', 'Guitarra clásica, incluye funda', 'https://images.unsplash.com/photo-1525202019596-b6c7b1e16575?w=500', 150.00, 3, 'USADO', 'APROBADO'),
(3, 10, 'Chaqueta de cuero', 'Chaqueta de cuero genuino, talla M', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 200.00, 4, 'USADO', 'APROBADO'),

-- Productos para Ana Martínez (Usuario 4)
(4, 1, 'Monitor 24 pulgadas', 'Monitor LED Full HD, marca Dell', 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500', 150.00, 3, 'USADO', 'APROBADO'),
(4, 2, 'Cafetera programable', 'Cafetera Mr. Coffee, 12 tazas', 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500', 45.00, 6, 'USADO', 'APROBADO'),
(4, 3, 'Libros de literatura', 'Colección de 5 libros clásicos', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 50.00, 4, 'USADO', 'APROBADO'),
(4, 4, 'Secador de pelo', 'Secador profesional 1800W', 'https://images.unsplash.com/photo-1522338140264-6f6c8b8e9b31?w=500', 35.00, 8, 'NUEVO', 'APROBADO'),
(4, 5, 'Florero de cristal', 'Florero transparente, diseño moderno', 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=500', 25.00, 6, 'NUEVO', 'APROBADO'),
(4, 6, 'Organizador de closet', 'Organizador de 6 cajones transparente', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', 30.00, 4, 'NUEVO', 'APROBADO'),
(4, 7, 'Masajeador eléctrico', 'Masajeador de cuello y hombros', 'https://images.unsplash.com/photo-1544168212-82ca0b6f7467?w=500', 60.00, 3, 'USADO', 'APROBADO'),
(4, 8, 'Pesas ajustables', 'Juego de pesas de 20kg ajustables', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 80.00, 6, 'USADO', 'APROBADO'),
(4, 9, 'Altavoz Bluetooth', 'Altavoz JBL Flip 5, resistencia al agua', 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500', 90.00, 4, 'USADO', 'APROBADO'),
(4, 10, 'Vestido de noche', 'Vestido elegante talla S, color negro', 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=500', 75.00, 3, 'USADO', 'APROBADO'),

-- Productos para Luis Rodríguez (Usuario 5)
(5, 1, 'Teclado mecánico', 'Teclado gaming RGB, switches azules', 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500', 70.00, 6, 'USADO', 'APROBADO'),
(5, 2, 'Aspiradora robot', 'Robot aspirador, navegación inteligente', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500', 220.00, 3, 'USADO', 'APROBADO'),
(5, 3, 'Mochila escolar', 'Mochila con ruedas, compartimentos múltiples', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', 55.00, 8, 'NUEVO', 'APROBADO'),
(5, 4, 'Afeitadora eléctrica', 'Afeitadora Philips Series 5000', 'https://images.unsplash.com/photo-162179148a9d1bb8e0b438d8d?w=500', 65.00, 4, 'USADO', 'APROBADO'),
(5, 5, 'Reloj de pared', 'Reloj vintage, números romanos', 'https://images.unsplash.com/photo-1512852939750-1305098529bf?w=500', 40.00, 6, 'USADO', 'APROBADO'),
(5, 6, 'Cámara de seguridad', 'Cámara WiFi, visión nocturna', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=500', 85.00, 3, 'NUEVO', 'APROBADO'),
(5, 7, 'Báscula de cocina', 'Báscula digital para alimentos', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500', 22.00, 8, 'NUEVO', 'APROBADO'),
(5, 8, 'Patines en línea', 'Patines talla 42, poco uso', 'https://images.unsplash.com/photo-1548340748-67de0bf8eb0e?w=500', 95.00, 4, 'USADO', 'APROBADO'),
(5, 9, 'Micrófono para streaming', 'Micrófono condensador USB', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500', 110.00, 6, 'USADO', 'APROBADO'),
(5, 10, 'Gafas de sol', 'Gafas de sol polarizadas, marca Ray-Ban', 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500', 120.00, 3, 'USADO', 'APROBADO'),

-- Productos para Sofia Hernandez (Usuario 6)
(6, 1, 'iPad Air', 'iPad Air 4ta generación, 64GB', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', 400.00, 4, 'USADO', 'APROBADO'),
(6, 2, 'Licuadora de vaso', 'Licuadora Oster, 8 velocidades', 'https://images.unsplash.com/photo-1571764488972-34a69ae699f9?w=500', 60.00, 6, 'USADO', 'APROBADO'),
(6, 3, 'Calculadora gráfica', 'Calculadora Casio fx-CG50', 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500', 100.00, 3, 'USADO', 'APROBADO'),
(6, 4, 'Plancha de pelo', 'Plancha cerámica, temperatura ajustable', 'https://images.unsplash.com/photo-1522338140264-6f6c8b8e9b31?w=500', 35.00, 8, 'NUEVO', 'APROBADO'),
(6, 5, 'Tapete persa', 'Tapete oriental 2x3 metros', 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500', 180.00, 1, 'USADO', 'APROBADO'),
(6, 6, 'Kit de pintura', 'Set completo de acuarelas y pinceles', 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500', 45.00, 6, 'NUEVO', 'APROBADO'),
(6, 7, 'Difusor de aromas', 'Difusor ultrasónico, luces LED', 'https://images.unsplash.com/photo-1604514813560-5d7b4b6c5f5a?w=500', 30.00, 8, 'NUEVO', 'APROBADO'),
(6, 8, 'Yoga mat', 'Mat de yoga extra grueso', 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500', 25.00, 6, 'NUEVO', 'APROBADO'),
(6, 9, 'Kindle Paperwhite', 'E-reader Amazon, 8GB', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 90.00, 4, 'USADO', 'APROBADO'),
(6, 10, 'Bolso de mano', 'Bolso de cuero genuino, color marrón', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', 85.00, 3, 'USADO', 'APROBADO'),

-- Productos para Diego García (Usuario 7)
(7, 1, 'PC Gamer', 'Computadora gaming, Ryzen 5, GTX 1660', 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500', 850.00, 1, 'USADO', 'APROBADO'),
(7, 2, 'Horno tostador', 'Horno tostador Oster, 6 rebanadas', 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=500', 50.00, 4, 'USADO', 'APROBADO'),
(7, 3, 'Enciclopedia', 'Enciclopedia universal, 12 volúmenes', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 120.00, 3, 'USADO', 'APROBADO'),
(7, 4, 'Cortadora de cabello', 'Kit profesional para corte de cabello', 'https://images.unsplash.com/photo-162179148a9d1bb8e0b438d8d?w=500', 40.00, 6, 'NUEVO', 'APROBADO'),
(7, 5, 'Lámpara de pie', 'Lámpara moderna, base de mármol', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500', 65.00, 4, 'USADO', 'APROBADO'),
(7, 6, 'Taladro inalámbrico', 'Taladro recargable, kit de 18V', 'https://images.unsplash.com/photo-1572981779307-38f8b0456222?w=500', 95.00, 3, 'USADO', 'APROBADO'),
(7, 7, 'Monitor de sueño', 'Dispositivo para tracking de sueño', 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500', 75.00, 6, 'NUEVO', 'APROBADO'),
(7, 8, 'Mancuernas', 'Par de mancuernas 10kg c/u', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500', 45.00, 8, 'NUEVO', 'APROBADO'),
(7, 9, 'Teclado musical', 'Teclado electrónico 61 teclas', 'https://images.unsplash.com/photo-1525202019596-b6c7b1e16575?w=500', 180.00, 3, 'USADO', 'APROBADO'),
(7, 10, 'Chaqueta impermeable', 'Chaqueta para lluvia, talla L', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 55.00, 6, 'USADO', 'APROBADO'),

-- Productos para Laura Díaz (Usuario 8)
(8, 1, 'Smart TV 43"', 'Televisor Smart TV 4K, marca LG', 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', 350.00, 1, 'USADO', 'APROBADO'),
(8, 2, 'Batidora de mano', 'Batidora Braun, 5 velocidades', 'https://images.unsplash.com/photo-1571764488972-34a69ae699f9?w=500', 40.00, 4, 'USADO', 'APROBADO'),
(8, 3, 'Atlas mundial', 'Atlas geográfico actualizado 2023', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', 35.00, 6, 'NUEVO', 'APROBADO'),
(8, 4, 'Depiladora láser', 'Depiladora casera, 5 niveles', 'https://images.unsplash.com/photo-1594736797933-d0c1381d388d?w=500', 150.00, 3, 'USADO', 'APROBADO'),
(8, 5, 'Espejo con luces', 'Espejo de maquillaje con LED', 'https://images.unsplash.com/photo-1552645265-3b9d3592a8e6?w=500', 70.00, 4, 'NUEVO', 'APROBADO'),
(8, 6, 'Caja de herramientas', 'Caja organizadora metálica', 'https://images.unsplash.com/photo-1572981779307-38f8b0456222?w=500', 45.00, 6, 'USADO', 'APROBADO'),
(8, 7, 'Nebulizador', 'Nebulizador médico para adultos', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 60.00, 3, 'USADO', 'APROBADO'),
(8, 8, 'Cinta de correr', 'Cinta de correr plegable, motorizada', 'https://images.unsplash.com/photo-1571019614241-5e35d7b0e5b5?w=500', 400.00, 1, 'USADO', 'APROBADO'),
(8, 9, 'Piano digital', 'Piano Yamaha P-45, 88 teclas', 'https://images.unsplash.com/photo-1525202019596-b6c7b1e16575?w=500', 450.00, 1, 'USADO', 'APROBADO'),
(8, 10, 'Zapatos de tacón', 'Zapatos de tacón medio, talla 37', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', 50.00, 4, 'USADO', 'APROBADO'),

-- Productos para Pedro Sánchez (Usuario 9)
(9, 1, 'MacBook Air', 'MacBook Air M1, 256GB, 2020', 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', 750.00, 1, 'USADO', 'APROBADO'),
(9, 2, 'Refrigeradora', 'Refrigeradora no frost, 350L', 'https://images.unsplash.com/photo-1591799264311-6d6d11e5d7f9?w=500', 500.00, 1, 'USADO', 'APROBADO'),
(9, 3, 'Microscopio', 'Microscopio estudiantil, 400x', 'https://images.unsplash.com/photo-1581093458791-8a6c6b8f5c5b?w=500', 120.00, 3, 'USADO', 'APROBADO'),
(9, 4, 'Máquina de afeitar', 'Máquina de afeitar Braun Series 7', 'https://images.unsplash.com/photo-162179148a9d1bb8e0b438d8d?w=500', 90.00, 4, 'USADO', 'APROBADO'),
(9, 5, 'Estatuilla decorativa', 'Estatuilla de bronce, estilo clásico', 'https://images.unsplash.com/photo-1578321272175-bb6c6e8e2b1c?w=500', 85.00, 6, 'USADO', 'APROBADO'),
(9, 6, 'Generador eléctrico', 'Generador portátil 3500W', 'https://images.unsplash.com/photo-1565026057446-b39275d6d3e5?w=500', 450.00, 1, 'USADO', 'APROBADO'),
(9, 7, 'Silla de masajes', 'Silla de masajes shiatsu portátil', 'https://images.unsplash.com/photo-1544168212-82ca0b6f7467?w=500', 300.00, 1, 'USADO', 'APROBADO'),
(9, 8, 'Mesa de ping pong', 'Mesa de tenis de mesa profesional', 'https://images.unsplash.com/photo-1622279457486-62dcc4a43126?w=500', 250.00, 1, 'USADO', 'APROBADO'),
(9, 9, 'Proyector HD', 'Proyector 1080p, 3500 lúmenes', 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=500', 200.00, 3, 'USADO', 'APROBADO'),
(9, 10, 'Traje formal', 'Traje de negocios talla 42, color azul', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500', 150.00, 4, 'USADO', 'APROBADO'),

-- Productos para Elena Ramírez (Usuario 10)
(10, 1, 'Drone DJI', 'Drone DJI Mini 2, 4K camera', 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500', 450.00, 1, 'USADO', 'APROBADO'),
(10, 2, 'Lavadora', 'Lavadora automática, 15kg', 'https://images.unsplash.com/photo-1551216223-37c60d6d5b3e?w=500', 380.00, 1, 'USADO', 'APROBADO'),
(10, 3, 'Telescopio', 'Telescopio astronómico, 70mm', 'https://images.unsplash.com/photo-1614642264769-d8f4d0b9e6f1?w=500', 130.00, 3, 'USADO', 'APROBADO'),
(10, 4, 'Cepillo facial', 'Cepillo limpiador facial sonic', 'https://images.unsplash.com/photo-162179148a9d1bb8e0b438d8d?w=500', 65.00, 6, 'USADO', 'APROBADO'),
(10, 5, 'Jarrón chino', 'Jarrón antiguo, diseño tradicional', 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622?w=500', 95.00, 4, 'USADO', 'APROBADO'),
(10, 6, 'Soldadora', 'Soldadora inverter, 140A', 'https://images.unsplash.com/photo-1572981779307-38f8b0456222?w=500', 180.00, 3, 'USADO', 'APROBADO'),
(10, 7, 'Inhalador', 'Inhalador para asma, nuevo en caja', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500', 50.00, 8, 'NUEVO', 'APROBADO'),
(10, 8, 'Tabla de surf', 'Tabla de surf epoxy, 6.2 pies', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500', 220.00, 1, 'USADO', 'APROBADO'),
(10, 9, 'Consola PS4', 'PlayStation 4 con 2 controles', 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', 280.00, 1, 'USADO', 'APROBADO'),
(10, 10, 'Abrigo de invierno', 'Abrigo térmico, talla M, color beige', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', 110.00, 6, 'USADO', 'APROBADO');

-- Insertar 25 carritos ACTIVOS
INSERT INTO carritos (id_usuario, estado) VALUES 
(1, 'ACTIVO'), (1, 'ACTIVO'), (2, 'ACTIVO'), (2, 'ACTIVO'), (3, 'ACTIVO'),
(3, 'ACTIVO'), (4, 'ACTIVO'), (4, 'ACTIVO'), (5, 'ACTIVO'), (5, 'ACTIVO'),
(6, 'ACTIVO'), (6, 'ACTIVO'), (7, 'ACTIVO'), (7, 'ACTIVO'), (8, 'ACTIVO'),
(8, 'ACTIVO'), (9, 'ACTIVO'), (9, 'ACTIVO'), (10, 'ACTIVO'), (10, 'ACTIVO'),
(1, 'ACTIVO'), (2, 'ACTIVO'), (3, 'ACTIVO'), (4, 'ACTIVO'), (5, 'ACTIVO');

-- Insertar 25 detalles de carrito
INSERT INTO carrito_detalle (id_carrito, id_producto, cantidad) VALUES 
-- Carrito 1-5
(1, 5, 2), (1, 12, 1), (1, 25, 1),
(2, 8, 3), (2, 15, 2),
(3, 3, 1), (3, 18, 2), (3, 22, 1),
(4, 7, 1), (4, 14, 3),
(5, 9, 2), (5, 21, 1), (5, 30, 1),
-- Carrito 6-10
(6, 11, 1), (6, 26, 2),
(7, 4, 3), (7, 17, 1),
(8, 13, 2), (8, 28, 1), (8, 35, 1),
(9, 6, 1), (9, 19, 2),
(10, 10, 1), (10, 24, 3), (10, 32, 1),
-- Carrito 11-15
(11, 2, 1), (11, 16, 2),
(12, 20, 1), (12, 29, 2),
(13, 1, 1), (13, 23, 1), (13, 34, 1),
(14, 27, 3), (14, 36, 2),
(15, 31, 1), (15, 40, 2),
-- Carrito 16-20
(16, 33, 1), (16, 42, 1), (16, 48, 2),
(17, 37, 1), (17, 45, 3),
(18, 39, 2), (18, 50, 1),
(19, 41, 1), (19, 46, 2), (19, 52, 1),
(20, 44, 1), (20, 49, 2),
-- Carrito 21-25
(21, 47, 3), (21, 55, 1),
(22, 51, 2), (22, 58, 1),
(23, 53, 1), (23, 60, 2), (23, 65, 1),
(24, 56, 1), (24, 63, 3),
(25, 59, 2), (25, 67, 1), (25, 70, 1);

-- Insertar 25 pedidos (15 EN_CURSO, 10 ENTREGADO)
INSERT INTO pedidos (id_usuario, id_tarjeta, fecha_pedido, fecha_entrega_estimada, estado, total) VALUES 
-- Pedidos EN_CURSO (1-15)
(1, 1, '2024-01-15 10:30:00', '2024-01-20', 'EN_CURSO', 185.00),
(2, 2, '2024-01-16 14:20:00', '2024-01-21', 'EN_CURSO', 320.50),
(3, 3, '2024-01-17 09:15:00', '2024-01-22', 'EN_CURSO', 95.75),
(4, 4, '2024-01-18 16:45:00', '2024-01-23', 'EN_CURSO', 420.00),
(5, 5, '2024-01-19 11:30:00', '2024-01-24', 'EN_CURSO', 150.25),
(6, 6, '2024-01-20 13:20:00', '2024-01-25', 'EN_CURSO', 275.80),
(7, 7, '2024-01-21 15:10:00', '2024-01-26', 'EN_CURSO', 180.00),
(8, 8, '2024-01-22 10:50:00', '2024-01-27', 'EN_CURSO', 520.40),
(9, 9, '2024-01-23 12:25:00', '2024-01-28', 'EN_CURSO', 95.00),
(10, 10, '2024-01-24 14:35:00', '2024-01-29', 'EN_CURSO', 310.75),
(1, 1, '2024-01-25 09:40:00', '2024-01-30', 'EN_CURSO', 125.60),
(2, 2, '2024-01-26 16:15:00', '2024-01-31', 'EN_CURSO', 480.90),
(3, 3, '2024-01-27 11:20:00', '2024-02-01', 'EN_CURSO', 220.30),
(4, 4, '2024-01-28 13:45:00', '2024-02-02', 'EN_CURSO', 175.45),
(5, 5, '2024-01-29 15:30:00', '2024-02-03', 'EN_CURSO', 390.20),

-- Pedidos ENTREGADO (16-25)
(6, 6, '2024-01-10 10:00:00', '2024-01-15', 'ENTREGADO', 210.50),
(7, 7, '2024-01-11 14:30:00', '2024-01-16', 'ENTREGADO', 135.75),
(8, 8, '2024-01-12 09:45:00', '2024-01-17', 'ENTREGADO', 580.00),
(9, 9, '2024-01-13 16:20:00', '2024-01-18', 'ENTREGADO', 95.25),
(10, 10, '2024-01-14 11:15:00', '2024-01-19', 'ENTREGADO', 320.80),
(1, 1, '2024-01-15 13:40:00', '2024-01-20', 'ENTREGADO', 245.60),
(2, 2, '2024-01-16 15:25:00', '2024-01-21', 'ENTREGADO', 180.90),
(3, 3, '2024-01-17 10:50:00', '2024-01-22', 'ENTREGADO', 420.30),
(4, 4, '2024-01-18 12:35:00', '2024-01-23', 'ENTREGADO', 295.45),
(5, 5, '2024-01-19 14:20:00', '2024-01-24', 'ENTREGADO', 160.20);

-- Insertar 25 detalles de pedido
INSERT INTO pedido_detalle (id_pedido, id_producto, cantidad, precio_unitario) VALUES 
-- Detalles para pedidos 1-5
(1, 5, 1, 150.00), (1, 12, 2, 35.00),
(2, 8, 1, 30.00), (2, 15, 1, 85.00), (2, 22, 1, 70.00),
(3, 3, 1, 450.00), (3, 18, 1, 90.00),
(4, 7, 2, 25.00), (4, 14, 1, 40.00), (4, 25, 1, 180.00),
(5, 9, 1, 75.00), (5, 21, 1, 65.00),

-- Detalles para pedidos 6-10
(6, 11, 1, 120.00), (6, 26, 1, 100.00),
(7, 4, 1, 80.00), (7, 17, 1, 280.00),
(8, 13, 1, 60.00), (8, 28, 1, 45.00), (8, 35, 1, 35.00),
(9, 6, 1, 35.00), (9, 19, 1, 65.00),
(10, 10, 1, 40.00), (10, 24, 1, 55.00), (10, 32, 1, 200.00),

-- Detalles para pedidos 11-15
(11, 2, 1, 800.00), (11, 16, 1, 90.00),
(12, 20, 1, 280.00), (12, 29, 1, 150.00),
(13, 1, 1, 1200.00), (13, 23, 1, 100.00),
(14, 27, 1, 55.00), (14, 36, 1, 60.00),
(15, 31, 1, 180.00), (15, 40, 1, 110.00),

-- Detalles para pedidos 16-20
(16, 33, 1, 70.00), (16, 42, 1, 85.00),
(17, 37, 1, 75.00), (17, 45, 1, 65.00),
(18, 39, 1, 400.00), (18, 50, 1, 50.00),
(19, 41, 1, 90.00), (19, 46, 1, 45.00),
(20, 44, 1, 70.00), (20, 49, 1, 85.00),

-- Detalles para pedidos 21-25
(21, 47, 1, 450.00), (21, 55, 1, 65.00),
(22, 51, 1, 90.00), (22, 58, 1, 150.00),
(23, 53, 1, 120.00), (23, 60, 1, 65.00),
(24, 56, 1, 95.00), (24, 63, 1, 180.00),
(25, 59, 1, 200.00), (25, 67, 1, 50.00);