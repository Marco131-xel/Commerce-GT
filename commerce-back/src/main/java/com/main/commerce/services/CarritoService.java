package com.main.commerce.services;

import com.main.commerce.entities.Carrito;
import com.main.commerce.entities.CarritoDetalle;
import com.main.commerce.entities.Producto;
import com.main.commerce.repositories.CarritoDetalleRepository;
import com.main.commerce.repositories.CarritoRepository;
import com.main.commerce.repositories.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarritoService {

    private final CarritoRepository carritoRepository;

    @Autowired
    private CarritoDetalleRepository carritoDetalleRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public Optional<Carrito> obtenerCarritoActivoPorUsuario(Long idUsuario) {
        return carritoRepository.findByUsuario_IdUsuario(idUsuario)
                .stream()
                .filter(c -> "ACTIVO".equalsIgnoreCase(c.getEstado()))
                .findFirst();
    }

    public void agregarProducto(Carrito carrito, Long idProducto, int cantidad) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // verificar si ya existe el producto en el carrito
        List<CarritoDetalle> detalles = carritoDetalleRepository.findByCarrito_IdCarrito(carrito.getIdCarrito());
        CarritoDetalle existente = detalles.stream()
                .filter(d -> d.getProducto().getIdProducto().equals(idProducto))
                .findFirst()
                .orElse(null);

        if (existente != null) {
            existente.setCantidad(existente.getCantidad() + cantidad);
            carritoDetalleRepository.save(existente);
        } else {
            CarritoDetalle nuevoDetalle = new CarritoDetalle();
            nuevoDetalle.setCarrito(carrito);
            nuevoDetalle.setProducto(producto);
            nuevoDetalle.setCantidad(cantidad);
            carritoDetalleRepository.save(nuevoDetalle);
        }
    }

    // metodos
    public CarritoService(CarritoRepository carritoRepository) {
        this.carritoRepository = carritoRepository;
    }

    public List<Carrito> obtenerTodos() {
        return carritoRepository.findAll();
    }

    public Optional<Carrito> obtenerPorId(Long id) {
        return carritoRepository.findById(id);
    }

    public List<Carrito> obtenerPorUsuario(Long idUsuario) {
        return carritoRepository.findByUsuario_IdUsuario(idUsuario);
    }

    public Carrito guardar(Carrito carrito) {
        return carritoRepository.save(carrito);
    }

    public void eliminar(Long id) {
        carritoRepository.deleteById(id);
    }
}
