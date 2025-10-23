package com.main.commerce.dtos;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record ProductoDto(
        Long idProducto,
        String nombre,
        String descripcion,
        BigDecimal precio,
        String imagenUrl,
        int stock,
        String estadoProducto,
        String estadoRevision,
        LocalDateTime fechaPublicacion,
        String categoriaNombre,
        String usuarioNombre
) { }
