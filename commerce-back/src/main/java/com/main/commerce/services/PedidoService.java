package com.main.commerce.services;

import com.main.commerce.entities.*;
import com.main.commerce.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoDetalleRepository detalleRepository;

    @Autowired
    private CarritoRepository carritoRepository;

    @Autowired
    private TarjetaRepository tarjetaRepository;

    @Autowired
    private ProductoRepository productoRepository;

    public List<Pedido> listarPorUsuario(Long idUsuario) {
        return pedidoRepository.findByUsuarioIdUsuarioOrderByFechaPedidoDesc(idUsuario);
    }

    public Pedido crearDesdeCarrito(Long idUsuario) {
        Tarjeta tarjeta = tarjetaRepository.findByUsuario_IdUsuario(idUsuario)
                .orElseThrow(() -> new RuntimeException("No tienes tarjeta registrada"));
        List<Carrito> carritos = carritoRepository.findByUsuario_IdUsuarioAndEstado(idUsuario, "ACTIVO");
        if (carritos.isEmpty()) {
            throw new RuntimeException("No tienes productos activos en el carrito");
        }

        Carrito carrito = carritos.get(0);

        if (carrito.getDetalles() == null || carrito.getDetalles().isEmpty()) {
            throw new RuntimeException("El carrito está vacío.");
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(carrito.getUsuario());
        pedido.setTarjeta(tarjeta);
        pedido.setFechaEntregaEstimada(LocalDate.now().plusDays(3));
        pedido.setEstado("EN_CURSO");

        BigDecimal total = BigDecimal.ZERO;

        for (CarritoDetalle item : carrito.getDetalles()) {

            PedidoDetalle detalle = new PedidoDetalle();
            detalle.setPedido(pedido);
            detalle.setProducto(item.getProducto());
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(item.getProducto().getPrecio());

            BigDecimal subtotalTemp = item.getProducto().getPrecio()
                    .multiply(BigDecimal.valueOf(item.getCantidad()));

            total = total.add(subtotalTemp);
            pedido.getDetalles().add(detalle);
            // Actualizar stock
            Producto p = item.getProducto();
            int nuevoStock = p.getStock() - item.getCantidad();
            p.setStock(nuevoStock);
            productoRepository.save(p);
        }

        pedido.setTotal(total);
        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        carritoRepository.delete(carrito);
        return pedidoGuardado;
    }

    public Pedido crearPedido(Pedido pedido) {
        BigDecimal total = BigDecimal.ZERO;
        if (pedido.getDetalles() != null) {
            for (PedidoDetalle detalle : pedido.getDetalles()) {
                detalle.setPedido(pedido);
                detalle.calcularSubtotal();
                total = total.add(detalle.getSubtotal());
            }
        }
        pedido.setTotal(total);
        return pedidoRepository.save(pedido);
    }

    public Pedido obtenerPorId(Long id) {
        return pedidoRepository.findById(id).orElse(null);
    }

    public void eliminar(Long idPedido) {
        pedidoRepository.deleteById(idPedido);
    }
}
