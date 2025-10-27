package com.main.commerce.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.main.commerce.entities.User;
import org.springframework.data.repository.CrudRepository;
import java.util.List;
import java.util.Map;

public interface ReporteRepository extends CrudRepository<User, Long> {

    // top 10 productos mas vendidos
    @Query(value = """
        SELECT 
            p.id_producto AS idProducto,
            p.nombre AS nombre,
            SUM(pd.cantidad) AS totalVendidos,
            SUM(pd.subtotal) AS totalGanancia
        FROM pedido_detalle pd
        JOIN pedidos pe ON pd.id_pedido = pe.id_pedido
        JOIN productos p ON pd.id_producto = p.id_producto
        WHERE pe.fecha_pedido BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')
        GROUP BY p.id_producto, p.nombre
        ORDER BY totalVendidos DESC
        LIMIT 10
    """, nativeQuery = true)
    List<Map<String, Object>> top10ProductosMasVendidos(
            @Param("inicio") String inicio,
            @Param("fin") String fin
    );

    // top 5 clientes que mas ganancias por compras han generado
    @Query(value = """
        SELECT 
            u.id_usuario AS idUsuario,
            u.nombre AS nombre,
            u.apellido AS apellido,
            SUM(pe.total) AS totalGastado
        FROM pedidos pe
        JOIN usuarios u ON pe.id_usuario = u.id_usuario
        WHERE pe.fecha_pedido BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')
        GROUP BY u.id_usuario, u.nombre, u.apellido
        ORDER BY totalGastado DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Map<String, Object>> top5ClientesMasGanancias(
            @Param("inicio") String inicio,
            @Param("fin") String fin
    );

    // top 5 clientes que mas productos han vendido
    @Query(value = """
        SELECT 
            u.id_usuario AS idUsuario,
            u.nombre AS nombre,
            u.apellido AS apellido,
            SUM(pd.cantidad) AS totalProductosVendidos,
            SUM(pd.subtotal) AS totalGanancias
        FROM pedido_detalle pd
        JOIN productos p ON pd.id_producto = p.id_producto
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        JOIN pedidos pe ON pd.id_pedido = pe.id_pedido
        WHERE pe.fecha_pedido BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')
        GROUP BY u.id_usuario, u.nombre, u.apellido
        ORDER BY totalProductosVendidos DESC
        LIMIT 5
    """, nativeQuery = true)
    List<Map<String, Object>> top5ClientesMasProductosVendidos(
            @Param("inicio") String inicio,
            @Param("fin") String fin
    );

    // top 10 clientes que mas pedidos han realizado
    @Query(value = """
        SELECT 
            u.id_usuario AS idUsuario,
            u.nombre AS nombre,
            u.apellido AS apellido,
            COUNT(pe.id_pedido) AS totalPedidos
        FROM pedidos pe
        JOIN usuarios u ON pe.id_usuario = u.id_usuario
        WHERE pe.fecha_pedido BETWEEN TO_DATE(:inicio, 'YYYY-MM-DD') AND TO_DATE(:fin, 'YYYY-MM-DD')
        GROUP BY u.id_usuario, u.nombre, u.apellido
        ORDER BY totalPedidos DESC
        LIMIT 10
    """, nativeQuery = true)
    List<Map<String, Object>> top10ClientesMasPedidos(
            @Param("inicio") String inicio,
            @Param("fin") String fin
    );

    // top 10 clientes con mas productos en venta
    @Query(value = """
        SELECT 
            u.id_usuario AS idUsuario,
            u.nombre AS nombre,
            u.apellido AS apellido,
            COUNT(p.id_producto) AS totalProductos
        FROM productos p
        JOIN usuarios u ON p.id_usuario = u.id_usuario
        WHERE p.estado_revision = 'APROBADO'
        GROUP BY u.id_usuario, u.nombre, u.apellido
        ORDER BY totalProductos DESC
        LIMIT 10
    """, nativeQuery = true)
    List<Map<String, Object>> top10ClientesMasProductosEnVenta();

    // historial de sanciones
    @Query(value = """
    SELECT 
        s.id_sancion AS idSancion,
        CONCAT(u.nombre, ' ', u.apellido) AS usuarioSancionado,
        CONCAT(m.nombre, ' ', m.apellido) AS moderador,
        s.motivo AS motivo,
        s.fecha_sancion AS fechaSancion,
        s.estado AS estado
    FROM sanciones s
    JOIN usuarios u ON s.id_usuario = u.id_usuario
    JOIN usuarios m ON s.id_moderador = m.id_usuario
    ORDER BY s.fecha_sancion DESC
""", nativeQuery = true)
    List<Map<String, Object>> historialSanciones();

}
