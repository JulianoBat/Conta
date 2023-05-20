package com.contasproject.contas.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.contasproject.contas.entities.Conta;

public interface ContaRepository extends JpaRepository<Conta, Long>{

}
