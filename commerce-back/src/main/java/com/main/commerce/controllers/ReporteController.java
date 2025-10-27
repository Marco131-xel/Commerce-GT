package com.main.commerce.controllers;

import com.main.commerce.services.ReporteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/reportes")
public class ReporteController {

    private final ReporteService reporteService;

    public ReporteController(ReporteService reporteService) {
        this.reporteService = reporteService;
    }

    @GetMapping("/productos-mas-vendidos")
    public List<Map<String, Object>> top10ProductosMasVendidos(
            @RequestParam String inicio,
            @RequestParam String fin
    ) {
        return reporteService.top10ProductosMasVendidos(inicio, fin);
    }

    @GetMapping("/clientes-mas-ganancias")
    public List<Map<String, Object>> top5ClientesMasGanancias(
            @RequestParam String inicio,
            @RequestParam String fin
    ) {
        return reporteService.top5ClientesMasGanancias(inicio, fin);
    }

    @GetMapping("/clientes-mas-vendidos")
    public List<Map<String, Object>> top5ClientesMasProductosVendidos(
            @RequestParam String inicio,
            @RequestParam String fin
    ) {
        return reporteService.top5ClientesMasProductosVendidos(inicio, fin);
    }

    @GetMapping("/clientes-mas-pedidos")
    public List<Map<String, Object>> top10ClientesMasPedidos(
            @RequestParam String inicio,
            @RequestParam String fin
    ) {
        return reporteService.top10ClientesMasPedidos(inicio, fin);
    }

    @GetMapping("/clientes-mas-productos")
    public List<Map<String, Object>> top10ClientesMasProductosEnVenta() {
        return reporteService.top10ClientesMasProductosEnVenta();
    }

    @GetMapping("/historial-sanciones")
    public List<Map<String, Object>> historialSanciones() {
        return reporteService.historialSanciones();
    }

}
