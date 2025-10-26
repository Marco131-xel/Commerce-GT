package com.main.commerce.repositories;

import com.main.commerce.entities.Carrito;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CarritoRepository extends JpaRepository<Carrito, Long> {

    List<Carrito> findByUsuario_IdUsuario(Long idUsuario);

    List<Carrito> findByUsuario_IdUsuarioAndEstado(Long idUsuario, String estado);

}
