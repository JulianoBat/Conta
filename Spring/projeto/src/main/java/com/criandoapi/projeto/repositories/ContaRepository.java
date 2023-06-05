package com.criandoapi.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.criandoapi.projeto.entities.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long> {
	
	Conta findById(long id);
	
}
