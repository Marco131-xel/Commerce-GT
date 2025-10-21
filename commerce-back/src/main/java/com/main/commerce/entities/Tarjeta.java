package com.main.commerce.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tarjetas")
public class Tarjeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tarjeta")
    private Long idTarjeta;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    @JsonIgnore
    private User usuario;

    @Column(name = "numero_tarjeta", nullable = false, length = 20)
    private String numeroTarjeta;

    @Column(name = "nombre_titular", nullable = false, length = 100)
    private String nombreTitular;

    @Column(name = "fecha_expiracion", nullable = false, length = 7)
    private String fechaExpiracion;

    @Column(name = "cvv", nullable = false, length = 4)
    private String cvv;
}
