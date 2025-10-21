package com.main.commerce.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {
    private String nombre;
    private String apellido;
    private String correo;
    private String telefono;
    private String direccion;
}
