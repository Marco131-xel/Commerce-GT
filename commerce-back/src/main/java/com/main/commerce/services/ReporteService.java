package com.main.commerce.services;

import com.main.commerce.repositories.ReporteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ReporteService {

    private final ReporteRepository reporteRepository;

    public ReporteService(ReporteRepository reporteRepository) {
        this.reporteRepository = reporteRepository;
    }

    public List<Map<String, Object>> top10ProductosMasVendidos(String inicio, String fin) {
        return reporteRepository.top10ProductosMasVendidos(inicio, fin);
    }

    public List<Map<String, Object>> top5ClientesMasGanancias(String inicio, String fin) {
        return reporteRepository.top5ClientesMasGanancias(inicio, fin);
    }

    public List<Map<String, Object>> top5ClientesMasProductosVendidos(String inicio, String fin) {
        return reporteRepository.top5ClientesMasProductosVendidos(inicio, fin);
    }

    public List<Map<String, Object>> top10ClientesMasPedidos(String inicio, String fin) {
        return reporteRepository.top10ClientesMasPedidos(inicio, fin);
    }

    public List<Map<String, Object>> top10ClientesMasProductosEnVenta() {
        return reporteRepository.top10ClientesMasProductosEnVenta();
    }
}
