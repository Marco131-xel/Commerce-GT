package com.main.commerce.controllers;

import com.main.commerce.entities.Tarjeta;
import com.main.commerce.services.TarjetaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/tarjeta")
public class TarjetaController {

    @Autowired
    private TarjetaService tarjetaService;

    // listar tarjetas del usuario
    @GetMapping
    public ResponseEntity<List<Tarjeta>> listarTarjetas(Authentication auth) {
        String correo = auth.getName();
        return ResponseEntity.ok(tarjetaService.listarPorUsuario(correo));
    }

    // crear tarjeta nueva
    @PostMapping
    public ResponseEntity<Tarjeta> crearTarjeta(Authentication auth, @RequestBody Tarjeta tarjeta) {
        String correo = auth.getName();
        Tarjeta nueva = tarjetaService.crearTarjeta(correo, tarjeta);
        return ResponseEntity.ok(nueva);
    }

    // actualizar tarjeta
    @PutMapping("/{id}")
    public ResponseEntity<Tarjeta> actualizarTarjeta(
            Authentication auth,
            @PathVariable Long id,
            @RequestBody Tarjeta tarjetaActualizada
    ) {
        String correo = auth.getName();
        Tarjeta actualizada = tarjetaService.actualizarTarjeta(correo, id, tarjetaActualizada);
        return ResponseEntity.ok(actualizada);
    }

    // eliminar tarjeta
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> eliminarTarjeta(Authentication auth, @PathVariable Long id) {
        String correo = auth.getName();
        tarjetaService.eliminarTarjeta(correo, id);
        return ResponseEntity.ok(Map.of("mensaje", "Tarjeta eliminada correctamente"));
    }

}
