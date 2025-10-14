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