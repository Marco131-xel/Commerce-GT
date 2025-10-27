package com.main.commerce.services;

import com.main.commerce.entities.Sancion;
import com.main.commerce.entities.User;
import com.main.commerce.repositories.SancionRepository;
import com.main.commerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SancionService {

    @Autowired
    private SancionRepository sancionRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Sancion> listarTodas() {
        return sancionRepository.findAll();
    }

    public Optional<Sancion> obtenerPorId(Long id) {
        return sancionRepository.findById(id);
    }

    public Sancion crear(Sancion sancion) {
        return sancionRepository.save(sancion);
    }

    public void suspenderUsuario(Long idUsuario, Long idModerador, String motivo) {
        User usuario = userRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        User moderador = userRepository.findById(idModerador)
                .orElseThrow(() -> new RuntimeException("Moderador no encontrado"));

        usuario.setEstado("SUSPENDIDO");
        userRepository.save(usuario);

        // Crear registro de sancion
        Sancion sancion = new Sancion();
        sancion.setUsuario(usuario);
        sancion.setModerador(moderador);
        sancion.setMotivo(motivo);
        sancion.setEstado("ACTIVA");

        this.crear(sancion);
    }


    public Sancion actualizar(Long id, Sancion sancionActualizada) {
        return sancionRepository.findById(id)
                .map(sancion -> {
                    sancion.setMotivo(sancionActualizada.getMotivo());
                    sancion.setEstado(sancionActualizada.getEstado());
                    return sancionRepository.save(sancion);
                })
                .orElseThrow(() -> new RuntimeException("Sanción no encontrada"));
    }

    public void eliminar(Long id) {
        sancionRepository.deleteById(id);
    }

    public List<Sancion> listarPorUsuario(User usuario) {
        return sancionRepository.findByUsuario(usuario);
    }

    public List<Sancion> listarActivas() {
        return sancionRepository.findByEstado("ACTIVA");
    }
}
