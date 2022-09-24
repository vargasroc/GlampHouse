package com.dh.proyectoIntegrador.repositories;

import com.dh.proyectoIntegrador.entities.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPolicyRepository extends JpaRepository <Policy, Long> {
}
