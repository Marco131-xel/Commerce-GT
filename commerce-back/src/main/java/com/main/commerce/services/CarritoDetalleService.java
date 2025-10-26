package com.main.commerce.services;

import com.main.commerce.entities.CarritoDetalle;
import com.main.commerce.repositories.CarritoDetalleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarritoDetalleService {

    private final CarritoDetalleRepository detalleRepository;

    public CarritoDetalleService(CarritoDetalleRepository detalleRepository) {
        this.detalleRepository = detalleRepository;
    }

    public List<CarritoDetalle> obtenerPorCarrito(Long idCarrito) {
        return detalleRepository.findByCarrito_IdCarrito(idCarrito);
    }

    public CarritoDetalle guardar(CarritoDetalle detalle) {
        return detalleRepository.save(detalle);
    }

    public void eliminar(Long idDetalle) {
        detalleRepository.deleteById(idDetalle);
    }
}
