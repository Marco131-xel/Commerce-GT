package com.main.commerce.controllers;

import com.main.commerce.entities.Carrito;
import com.main.commerce.entities.User;
import com.main.commerce.services.CarritoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/carritos")
public class CarritoController {

    private final CarritoService carritoService;

    public CarritoController(CarritoService carritoService) {
        this.carritoService = carritoService;
    }

    // listar todos los carritos para admin
    @GetMapping
    public ResponseEntity<List<Carrito>> listar() {
        return ResponseEntity.ok(carritoService.obtenerTodos());
    }

    // obtener carrito por ID
    @GetMapping("/{id}")
    public ResponseEntity<Carrito> obtenerPorId(@PathVariable Long id) {
        return carritoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // listar carritos de un usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Carrito>> obtenerPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(carritoService.obtenerPorUsuario(idUsuario));
    }

    // agregar producto al carrito
    @PostMapping("/agregar")
    public ResponseEntity<?> agregarProductoAlCarrito(@RequestParam Long idUsuario,
                                                      @RequestParam Long idProducto,
                                                      @RequestParam(defaultValue = "1") int cantidad) {
        try {
            Carrito carrito = carritoService.obtenerCarritoActivoPorUsuario(idUsuario)
                    .orElseGet(() -> {
                        Carrito nuevo = new Carrito();
                        User usuario = new User();
                        usuario.setIdUsuario(idUsuario);
                        nuevo.setUsuario(usuario);
                        nuevo.setEstado("ACTIVO");
                        return carritoService.guardar(nuevo);
                    });

            carritoService.agregarProducto(carrito, idProducto, cantidad);
            return ResponseEntity.ok("Producto agregado al carrito");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // obtener el carrito activo de un usuario
    @GetMapping("/usuario/{idUsuario}/activo")
    public ResponseEntity<?> obtenerCarritoActivo(@PathVariable Long idUsuario) {
        var carritoOpt = carritoService.obtenerCarritoActivoPorUsuario(idUsuario);

        if (carritoOpt.isPresent()) {
            return ResponseEntity.ok(carritoOpt.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    //  crear manualmente un carrito
    @PostMapping
    public ResponseEntity<Carrito> crear(@RequestBody Carrito carrito) {
        return ResponseEntity.ok(carritoService.guardar(carrito));
    }

    // eliminar carrito por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        carritoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
