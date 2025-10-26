package com.main.commerce.controllers;

import com.main.commerce.dtos.ProductoDto;
import com.main.commerce.entities.Producto;
import com.main.commerce.services.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // listar productos del usuario autenticado
    @GetMapping
    public ResponseEntity<List<Producto>> listarMisProductos(Authentication auth) {
        String correo = auth.getName();
        return ResponseEntity.ok(productoService.listarPorUsuario(correo));
    }

    // listar todos los productos del usuario con DTO
    @GetMapping("/mis-productos")
    public ResponseEntity<List<ProductoDto>> listarMisProductosDTO(Authentication auth) {
        String correo = auth.getName();
        return ResponseEntity.ok(productoService.listarMisProductosDTO(correo));
    }

    // listar productos del usuario filtrados por estado (pendiente, aprobado, rechazado)
    @GetMapping("/mis-productos/{estado}")
    public ResponseEntity<List<ProductoDto>> listarMisProductosPorEstado(
            Authentication auth,
            @PathVariable String estado
    ) {
        String correo = auth.getName();
        return ResponseEntity.ok(productoService.listarMisProductosPorEstado(correo, estado.toUpperCase()));
    }

    // crear producto
    @PostMapping
    public ResponseEntity<Producto> crearProducto(Authentication auth, @RequestBody Producto producto) {
        String correo = auth.getName();
        return ResponseEntity.ok(productoService.crearProducto(correo, producto));
    }

    // actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizarProducto(
            Authentication auth,
            @PathVariable Long id,
            @RequestBody Producto producto
    ) {
        String correo = auth.getName();
        return ResponseEntity.ok(productoService.actualizarProducto(correo, id, producto));
    }

    // eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarProducto(Authentication auth, @PathVariable Long id) {
        String correo = auth.getName();
        productoService.eliminarProducto(correo, id);
        return ResponseEntity.noContent().build();
    }

    // listar todos los productos aprobados
    @GetMapping("/publicos")
    public ResponseEntity<List<ProductoDto>> listarAprobados(Authentication auth) {
        if (auth != null && auth.isAuthenticated()) {
            String correo = auth.getName();
            return ResponseEntity.ok(productoService.listarAprobadosExcluyendoUsuario(correo));
        } else {
            // Si no hay usuario autenticado, mostrar todos los aprobados
            return ResponseEntity.ok(
                    productoService.listarAprobados()
            );
        }
    }

    // listar todos los productos pendientes (moderador)
    @GetMapping("/pendientes")
    public ResponseEntity<List<ProductoDto>> listarPendientes() {
        return ResponseEntity.ok(productoService.listarPendientesDTO());
    }

    // actualizar el estado segun el (moderador)
    @PutMapping("/{id}/estado")
    public ResponseEntity<?> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String estado = body.get("estadoRevision");
        productoService.actualizarEstadoRevision(id, estado);
        return ResponseEntity.ok().build();
    }

}
