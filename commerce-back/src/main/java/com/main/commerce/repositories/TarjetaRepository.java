package com.main.commerce.repositories;

import com.main.commerce.entities.Tarjeta;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TarjetaRepository extends JpaRepository<Tarjeta, Long> {

    // buscar tarjeta por usuario
    Optional<Tarjeta> findByUsuario_IdUsuario(Long idUsuario);

    // listar todas las tarjetas de un usuario
    List<Tarjeta> findAllByUsuario_IdUsuario(Long idUsuario);
}
