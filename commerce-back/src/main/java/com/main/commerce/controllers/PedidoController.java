package com.main.commerce.controllers;

import com.main.commerce.entities.Pedido;
import com.main.commerce.services.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // listar los pedidos por usuario
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Pedido>> listarPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(pedidoService.listarPorUsuario(idUsuario));
    }

    // obtener el id de un pedido
    @GetMapping("/{idPedido}")
    public ResponseEntity<Pedido> obtenerPorId(@PathVariable Long idPedido) {
        Pedido pedido = pedidoService.obtenerPorId(idPedido);
        return (pedido != null) ? ResponseEntity.ok(pedido) : ResponseEntity.notFound().build();
    }

    // crear pedido desde el carrito
    @PostMapping("/crear-desde-carrito/{idUsuario}")
    public ResponseEntity<?> crearDesdeCarrito(@PathVariable Long idUsuario) {
        try {
            Pedido pedido = pedidoService.crearDesdeCarrito(idUsuario);
            return ResponseEntity.ok(pedido);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // crear pedido
    @PostMapping
    public ResponseEntity<Pedido> crearPedido(@RequestBody Pedido pedido) {
        return ResponseEntity.ok(pedidoService.crearPedido(pedido));
    }

    // eliminar un pedido
    @DeleteMapping("/{idPedido}")
    public ResponseEntity<Void> eliminar(@PathVariable Long idPedido) {
        pedidoService.eliminar(idPedido);
        return ResponseEntity.noContent().build();
    }

    // listar todos los pedidos para logística
    @GetMapping("/todos")
    public ResponseEntity<List<Pedido>> listarTodos() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    // marcar pedido como entregado
    @PutMapping("/{idPedido}/entregado")
    public ResponseEntity<Pedido> marcarComoEntregado(@PathVariable Long idPedido) {
        try {
            Pedido actualizado = pedidoService.marcarComoEntregado(idPedido);
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
