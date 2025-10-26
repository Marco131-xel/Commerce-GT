package com.main.commerce.repositories;

import com.main.commerce.entities.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    List<Pedido> findByUsuarioIdUsuarioOrderByFechaPedidoDesc(Long idUsuario);
}