package com.main.commerce.repositories;

import com.main.commerce.entities.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    List<Producto> findAllByUsuario_IdUsuario(Long idUsuario);
    List<Producto> findAllByCategoria_IdCategoria(Long idCategoria);
}
