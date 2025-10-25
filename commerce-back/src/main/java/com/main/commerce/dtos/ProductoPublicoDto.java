package com.main.commerce.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductoPublicoDto (
    Long idProducto,
    String nombre,
    String descripcion,
    BigDecimal precio,
    String imagenUrl,
    int stock,
    String estadoProducto,
    LocalDateTime fechaPublicacion,
    String categoriaNombre,
    String usuarioNombre
) { }