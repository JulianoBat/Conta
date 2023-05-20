package com.criandoapi.projeto.DTO;

import org.springframework.data.repository.CrudRepository;

import com.criandoapi.projeto.entities.Conta;

public interface IConta extends CrudRepository<Conta, Long>{

}
