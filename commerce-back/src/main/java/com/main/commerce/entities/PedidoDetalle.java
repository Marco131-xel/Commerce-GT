package com.main.commerce.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "pedido_detalle")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class PedidoDetalle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = false)
    @JsonBackReference
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(nullable = false)
    private int cantidad;

    @Column(name = "precio_unitario", precision = 10, scale = 2, nullable = false)
    private BigDecimal precioUnitario;

    @Column(precision = 10, scale = 2, insertable = false, updatable = false)
    private BigDecimal subtotal;

    @PrePersist
    @PreUpdate
    public void calcularSubtotal() {
        if (precioUnitario != null) {
            this.subtotal = precioUnitario.multiply(BigDecimal.valueOf(cantidad));
        }
    }

}