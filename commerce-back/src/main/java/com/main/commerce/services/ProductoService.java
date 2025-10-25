package com.main.commerce.services;

import com.main.commerce.dtos.ProductoDto;
import com.main.commerce.dtos.ProductoPublicoDto;
import com.main.commerce.entities.Categoria;
import com.main.commerce.entities.Producto;
import com.main.commerce.entities.User;
import com.main.commerce.repositories.CategoriaRepository;
import com.main.commerce.repositories.ProductoRepository;
import com.main.commerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    // listar productos del usuario
    public List<Producto> listarPorUsuario(String correo) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return productoRepository.findAllByUsuario_IdUsuario(usuario.getIdUsuario());
    }

    // listar productos del usuario autenticado con DTO
    public List<ProductoDto> listarMisProductosDTO(String correo) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return productoRepository.findAllByUsuario_IdUsuario(usuario.getIdUsuario())
                .stream()
                .map(p -> new ProductoDto(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getPrecio(),
                        p.getImagenUrl(),
                        p.getStock(),
                        p.getEstadoProducto(),
                        p.getEstadoRevision(),
                        p.getFechaPublicacion(),
                        p.getCategoria().getNombre(),
                        p.getUsuario().getNombre()
                ))
                .toList();
    }

    // listar productos del usuario autenticado por estado
    public List<ProductoDto> listarMisProductosPorEstado(String correo, String estado) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return productoRepository.findAllByUsuario_IdUsuario(usuario.getIdUsuario())
                .stream()
                .filter(p -> p.getEstadoRevision().equalsIgnoreCase(estado))
                .map(p -> new ProductoDto(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getPrecio(),
                        p.getImagenUrl(),
                        p.getStock(),
                        p.getEstadoProducto(),
                        p.getEstadoRevision(),
                        p.getFechaPublicacion(),
                        p.getCategoria().getNombre(),
                        p.getUsuario().getNombre()
                ))
                .toList();
    }


    // crear producto
    public Producto crearProducto(String correo, Producto producto) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Categoria categoria = categoriaRepository.findById(producto.getCategoria().getIdCategoria())
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        producto.setUsuario(usuario);
        producto.setCategoria(categoria);
        producto.setEstadoRevision("PENDIENTE");

        return productoRepository.save(producto);
    }

    // actualizar producto
    public Producto actualizarProducto(String correo, Long id, Producto datos) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!producto.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No puedes modificar este producto");
        }

        producto.setNombre(datos.getNombre());
        producto.setDescripcion(datos.getDescripcion());
        producto.setPrecio(datos.getPrecio());
        producto.setStock(datos.getStock());
        producto.setImagenUrl(datos.getImagenUrl());
        producto.setEstadoProducto(datos.getEstadoProducto());
        producto.setCategoria(datos.getCategoria());

        return productoRepository.save(producto);
    }

    // eliminar producto
    public void eliminarProducto(String correo, Long id) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Producto producto = productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!producto.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No puedes eliminar este producto");
        }

        productoRepository.delete(producto);
    }

    // listar todos los productos aprobados
    public List<ProductoDto> listarAprobados() {
        return productoRepository.findAll().stream()
                .filter(p -> "APROBADO".equals(p.getEstadoRevision()))
                .map(p -> new ProductoDto(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getPrecio(),
                        p.getImagenUrl(),
                        p.getStock(),
                        p.getEstadoProducto(),
                        p.getEstadoRevision(),
                        p.getFechaPublicacion(),
                        p.getCategoria().getNombre(),
                        p.getUsuario().getNombre()
                ))
                .toList();
    }

    // listar todos los productos aprobados (excluyendo los del usuario autenticado)
    public List<ProductoDto> listarAprobadosExcluyendoUsuario(String correo) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return productoRepository.findAll().stream()
                .filter(p -> "APROBADO".equals(p.getEstadoRevision()))
                .filter(p -> !p.getUsuario().getIdUsuario().equals(usuario.getIdUsuario()))
                .map(p -> new ProductoDto(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getPrecio(),
                        p.getImagenUrl(),
                        p.getStock(),
                        p.getEstadoProducto(),
                        p.getEstadoRevision(),
                        p.getFechaPublicacion(),
                        p.getCategoria().getNombre(),
                        p.getUsuario().getNombre()
                ))
                .toList();
    }

    // listar todos los productos pendientes (moderador)
    public List<ProductoDto> listarPendientesDTO() {
        return productoRepository.findAll().stream()
                .filter(p -> "PENDIENTE".equals(p.getEstadoRevision()))
                .map(p -> new ProductoDto(
                        p.getIdProducto(),
                        p.getNombre(),
                        p.getDescripcion(),
                        p.getPrecio(),
                        p.getImagenUrl(),
                        p.getStock(),
                        p.getEstadoProducto(),
                        p.getEstadoRevision(),
                        p.getFechaPublicacion(),
                        p.getCategoria().getNombre(),
                        p.getUsuario().getNombre()
                ))
                .toList();
    }

    // actualizar el estado de revision para moderador
    public void actualizarEstadoRevision(Long idProducto, String nuevoEstado) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        if (!"APROBADO".equalsIgnoreCase(nuevoEstado) &&
                !"RECHAZADO".equalsIgnoreCase(nuevoEstado) &&
                !"PENDIENTE".equalsIgnoreCase(nuevoEstado)) {
            throw new IllegalArgumentException("Estado de revisión no válido: " + nuevoEstado);
        }

        producto.setEstadoRevision(nuevoEstado.toUpperCase());
        productoRepository.save(producto);
    }

}
