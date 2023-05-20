package com.contasproject.contas.DAO;

import org.springframework.data.repository.CrudRepository;

import com.contasproject.contas.entities.Conta;

public interface IConta extends CrudRepository<Conta, Long>{

}
