package com.main.commerce.repositories;

import com.main.commerce.entities.Sancion;
import com.main.commerce.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SancionRepository extends JpaRepository<Sancion, Long> {

    List<Sancion> findByUsuario(User usuario);
    List<Sancion> findByEstado(String estado);
    Sancion findTopByUsuario_IdUsuarioAndEstadoOrderByFechaSancionDesc(Long idUsuario, String estado);
}