package com.main.commerce.services;

import com.main.commerce.entities.Categoria;
import com.main.commerce.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaService {

    @Autowired
    private CategoriaRepository categoriaRepository;

    public List<Categoria> listar() {
        return categoriaRepository.findAll();
    }

    public Categoria crear(Categoria categoria) {
        if (categoriaRepository.existsByNombre(categoria.getNombre())) {
            throw new RuntimeException("Ya existe una categoría con ese nombre.");
        }
        return categoriaRepository.save(categoria);
    }

    public Categoria actualizar(Long id, Categoria nuevaCategoria) {
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoría no encontrada"));

        categoria.setNombre(nuevaCategoria.getNombre());
        return categoriaRepository.save(categoria);
    }

    public void eliminar(Long id) {
        if (!categoriaRepository.existsById(id)) {
            throw new RuntimeException("La categoría no existe");
        }
        categoriaRepository.deleteById(id);
    }
}
