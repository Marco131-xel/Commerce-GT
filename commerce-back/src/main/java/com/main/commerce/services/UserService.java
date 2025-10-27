package com.main.commerce.services;

import com.main.commerce.dtos.UpdateUserDto;
import com.main.commerce.entities.User;
import com.main.commerce.repositories.UserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@NoArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        User user = userRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getTipoUsuario());

        return new org.springframework.security.core.userdetails.User(
                user.getCorreo(),
                user.getContrasena(),
                Collections.singleton(authority)
        );
    }

    public boolean existsByCorreo(String correo) {
        return userRepository.existsByCorreo(correo);
    }

    public void save(User user) {
        userRepository.save(user);
    }

    public Optional<User> findByCorreo(String correo) {
        return userRepository.findByCorreo(correo);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, UpdateUserDto dto) {
        return userRepository.findById(id).map(user -> {
            user.setNombre(dto.getNombre());
            user.setApellido(dto.getApellido());
            user.setCorreo(dto.getCorreo());
            user.setTelefono(dto.getTelefono());
            user.setDireccion(dto.getDireccion());
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public List<User> findAllComun() {
        return userRepository.findAll()
                .stream()
                .filter(user -> "COMUN".equalsIgnoreCase(user.getTipoUsuario()))
                .toList();
    }

    public List<User> findAllExceptComun() {
        return userRepository.findAll()
                .stream()
                .filter(user -> !"COMUN".equalsIgnoreCase(user.getTipoUsuario()))
                .toList();
    }


}
