package com.main.commerce.controllers;

import com.main.commerce.dtos.UpdateUserDto;
import com.main.commerce.entities.User;
import com.main.commerce.entities.Sancion;
import com.main.commerce.repositories.SancionRepository;
import com.main.commerce.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @Autowired
    private SancionRepository sancionRepository;


    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // obtener datos del usuario autenticado
    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@AuthenticationPrincipal UserDetails userDetails) {
        var correo = userDetails.getUsername();
        var user = userService.findByCorreo(correo).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(user);
    }

    // actualizar datos del usuario autenticado
    @PutMapping("/update")
    public ResponseEntity<?> updateMyProfile(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UpdateUserDto dto) {
        var correo = userDetails.getUsername();
        var user = userService.findByCorreo(correo).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        User updated = userService.updateUser(user.getIdUsuario(), dto);
        return ResponseEntity.ok(Map.of("message", "Usuario actualizado", "user", updated));
    }

    // eliminar cuenta del usuario autenticado
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMyAccount(@AuthenticationPrincipal UserDetails userDetails) {
        var correo = userDetails.getUsername();
        var  user = userService.findByCorreo(correo).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        userService.deleteUser(user.getIdUsuario());
        return ResponseEntity.ok(Map.of("message", "Cuenta eliminada"));
    }

    // obtener todos los usuarios
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.findAll());
    }

    /* FUNCIONES ADMIN */
    // actualizar usuario por admin
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUserById(@PathVariable Long id, @RequestBody UpdateUserDto dto) {
        User updated = userService.updateUser(id, dto);
        return ResponseEntity.ok(Map.of("message", "Usuario actualizado", "user", updated));
    }

    // eliminar usuario por admin
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "Usuario eliminado"));
    }

    // obtener todos los usuarios excepto los COMUN
    @GetMapping("/empleados")
    public ResponseEntity<?> getAllEmployees() {
        return ResponseEntity.ok(userService.findAllExceptComun());
    }

    // obtener solo usuarios comunes
    @GetMapping("/comunes")
    public ResponseEntity<?> getAllComunUsers() {
        return ResponseEntity.ok(userService.findAllComun());
    }

    // suspender usuario por moderador
    @PutMapping("/suspender/{id}")
    public ResponseEntity<?> suspenderUsuario(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setEstado("SUSPENDIDO");
        userService.save(user);

        return ResponseEntity.ok(Map.of("message", "Usuario suspendido correctamente"));
    }

    // activar usuario por moderador
    @PutMapping("/activar/{id}")
    public ResponseEntity<?> activarUsuario(@PathVariable Long id) {
        User user = userService.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setEstado("ACTIVO");
        userService.save(user);
        Sancion sancionActiva = sancionRepository.findTopByUsuario_IdUsuarioAndEstadoOrderByFechaSancionDesc(id, "ACTIVA");

        if (sancionActiva != null) {
            sancionActiva.setEstado("LEVANTADA");
            sancionRepository.save(sancionActiva);
        }

        return ResponseEntity.ok(Map.of("message", "Usuario activado y sancion levantada"));
    }

}
