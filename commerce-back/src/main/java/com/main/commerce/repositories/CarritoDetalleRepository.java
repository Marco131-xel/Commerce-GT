package com.main.commerce.repositories;

import com.main.commerce.entities.CarritoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarritoDetalleRepository extends JpaRepository<CarritoDetalle, Long> {
    List<CarritoDetalle> findByCarrito_IdCarrito(Long idCarrito);
}

