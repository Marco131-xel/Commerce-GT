package com.main.commerce.controllers;

import com.main.commerce.entities.Sancion;
import com.main.commerce.services.SancionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/sanciones")
public class SancionController {

    @Autowired
    private SancionService sancionService;

    @GetMapping
    public List<Sancion> listarTodas() {
        return sancionService.listarTodas();
    }

    @GetMapping("/{id}")
    public Sancion obtenerPorId(@PathVariable Long id) {
        return sancionService.obtenerPorId(id)
                .orElseThrow(() -> new RuntimeException("Sanción no encontrada"));
    }

    @PostMapping
    public Sancion crear(@RequestBody Sancion sancion) {
        return sancionService.crear(sancion);
    }

    @PutMapping("/{id}")
    public Sancion actualizar(@PathVariable Long id, @RequestBody Sancion sancion) {
        return sancionService.actualizar(id, sancion);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        sancionService.eliminar(id);
    }

    @GetMapping("/activas")
    public List<Sancion> listarActivas() {
        return sancionService.listarActivas();
    }

    @PutMapping("/suspender/{idUsuario}")
    public ResponseEntity<?> suspenderUsuario(
            @PathVariable Long idUsuario,
            @RequestParam Long idModerador,
            @RequestParam String motivo
    ) {
        sancionService.suspenderUsuario(idUsuario, idModerador, motivo);
        return ResponseEntity.ok(Map.of("message", "Usuario suspendido y sancion registrada"));
    }
}
