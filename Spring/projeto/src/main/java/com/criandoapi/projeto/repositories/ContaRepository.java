package com.criandoapi.projeto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.criandoapi.projeto.entities.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long>{

}
