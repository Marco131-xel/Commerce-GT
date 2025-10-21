package com.main.commerce.services;

import com.main.commerce.entities.Tarjeta;
import com.main.commerce.entities.User;
import com.main.commerce.repositories.TarjetaRepository;
import com.main.commerce.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TarjetaService {

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private UserRepository userRepository;

    // funcion para mostrar lista de tarjeta por usuario
    public List<Tarjeta> listarPorUsuario(String correo) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return tarjetaRepository.findAllByUsuario_IdUsuario(usuario.getIdUsuario());
    }

    // funcion para crear tarjeta
    public Tarjeta crearTarjeta(String correo, Tarjeta tarjeta) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        boolean existe = tarjetaRepository.findAllByUsuario_IdUsuario(usuario.getIdUsuario())
                .stream()
                .anyMatch(t -> t.getNumeroTarjeta().equals(tarjeta.getNumeroTarjeta()));
        if (existe) {
            throw new RuntimeException("Ya tienes registrada esta tarjeta.");
        }

        tarjeta.setUsuario(usuario);
        return tarjetaRepository.save(tarjeta);
    }

    // funcion para actulizar tarjeta
    public Tarjeta actualizarTarjeta(String correo, Long idTarjeta, Tarjeta nuevaTarjeta) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Tarjeta tarjeta = tarjetaRepository.findById(idTarjeta)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada"));

        if (!tarjeta.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No puedes modificar esta tarjeta");
        }

        tarjeta.setNumeroTarjeta(nuevaTarjeta.getNumeroTarjeta());
        tarjeta.setNombreTitular(nuevaTarjeta.getNombreTitular());
        tarjeta.setFechaExpiracion(nuevaTarjeta.getFechaExpiracion());
        tarjeta.setCvv(nuevaTarjeta.getCvv());

        return tarjetaRepository.save(tarjeta);
    }

    // funcion para eliminar tarjeta
    public void eliminarTarjeta(String correo, Long idTarjeta) {
        User usuario = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        Tarjeta tarjeta = tarjetaRepository.findById(idTarjeta)
                .orElseThrow(() -> new RuntimeException("Tarjeta no encontrada"));

        if (!tarjeta.getUsuario().getIdUsuario().equals(usuario.getIdUsuario())) {
            throw new RuntimeException("No puedes eliminar esta tarjeta");
        }

        tarjetaRepository.delete(tarjeta);
    }
}
