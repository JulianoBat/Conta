package com.criandoapi.projeto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.criandoapi.projeto.entities.Conta;
import com.criandoapi.projeto.repositories.ContaRepository;

@Service
public class ContaService {

	@Autowired
	private ContaRepository repository;
	
	public List<Conta> listarConta(){
		List<Conta> lista = repository.findAll();
		return lista;
	}
	
	public Conta criarConta(Conta conta) {
		Conta novaConta = repository.save(conta);
		return novaConta;
	}
	
}
