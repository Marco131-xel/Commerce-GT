package com.main.commerce.services;

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
    public List<Producto> listarAprobados() {
        return productoRepository.findAll()
                .stream()
                .filter(p -> "APROBADO".equals(p.getEstadoRevision()))
                .toList();
    }
}
