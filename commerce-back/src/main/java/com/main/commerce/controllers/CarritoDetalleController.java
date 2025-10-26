package com.main.commerce.controllers;

import com.main.commerce.entities.CarritoDetalle;
import com.main.commerce.services.CarritoDetalleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/carrito-detalle")
public class CarritoDetalleController {

    private final CarritoDetalleService detalleService;

    public CarritoDetalleController(CarritoDetalleService detalleService) {
        this.detalleService = detalleService;
    }

    @GetMapping("/carrito/{idCarrito}")
    public ResponseEntity<List<CarritoDetalle>> obtenerPorCarrito(@PathVariable Long idCarrito) {
        return ResponseEntity.ok(detalleService.obtenerPorCarrito(idCarrito));
    }

    @PostMapping
    public ResponseEntity<CarritoDetalle> agregar(@RequestBody CarritoDetalle detalle) {
        return ResponseEntity.ok(detalleService.guardar(detalle));
    }

    @DeleteMapping("/{idDetalle}")
    public ResponseEntity<Void> eliminar(@PathVariable Long idDetalle) {
        detalleService.eliminar(idDetalle);
        return ResponseEntity.noContent().build();
    }
}
