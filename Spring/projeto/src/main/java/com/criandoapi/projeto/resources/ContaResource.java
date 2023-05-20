package com.criandoapi.projeto.resources;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criandoapi.projeto.DTO.IConta;
import com.criandoapi.projeto.entities.Conta;

@RestController
@CrossOrigin("*")
@RequestMapping("/conta")
public class ContaResource {

	@Autowired
	private IConta iConta;

	@GetMapping
	public List<Conta> listaConta() {
		return (List<Conta>) iConta.findAll();
	}
	
	@PostMapping
	public Conta registrarConta(@RequestBody Conta conta) {
		Conta novaConta = iConta.save(conta);
		return novaConta;
	}
	
	@PutMapping
	public Conta alterarConta(@RequestBody Conta conta) {
		Conta novaConta = iConta.save(conta);
		return novaConta;
	}
	
	@DeleteMapping("/{id}")
	public Optional<Conta> deletarConta(@PathVariable Long id) {
		Optional<Conta> conta = iConta.findById(id);
		iConta.deleteById(id);
		return conta;
	}
}
