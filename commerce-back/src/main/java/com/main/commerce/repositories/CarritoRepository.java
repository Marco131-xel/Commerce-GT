package com.main.commerce.repositories;

import com.main.commerce.entities.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {
    List<Carrito> findByUsuario_IdUsuario(Long idUsuario);
}
