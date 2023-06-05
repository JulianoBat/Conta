package com.criandoapi.projeto.services;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

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
	
	public Conta contaId(long id) {
		return repository.findById(id);
	}
	
	public Conta criarConta(Conta conta) {
		Conta novaConta = repository.save(conta);
		return novaConta;
	}
	
	public Conta alterarConta(Long id, Conta conta) {
		
		Conta contaAtual = repository.findById(id).get();
		BeanUtils.copyProperties(conta, contaAtual, "id");
		return repository.save(contaAtual);
	}
	
	public Boolean excluirConta (Long id) {
		repository.deleteById(id);
		return true;
	}
	
}
