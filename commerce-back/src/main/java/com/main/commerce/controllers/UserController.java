package com.main.commerce.controllers;

import com.main.commerce.dtos.UpdateUserDto;
import com.main.commerce.entities.User;
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
}
