package com.criandoapi.projeto.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.criandoapi.projeto.entities.Conta;
import com.criandoapi.projeto.repositories.ContaRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/conta")
public class ContaController {

	@Autowired
	private ContaRepository repository;
	
	
	@GetMapping
	public ResponseEntity<List<Conta>>  listaConta() {
		List<Conta> lista = (List<Conta>) repository.findAll();
		return ResponseEntity.status(200).body(lista); 
	}

	@PostMapping
	public ResponseEntity<Conta> registrarConta(@RequestBody Conta conta) {
		Conta novaConta = repository.save(conta);
		return ResponseEntity.status(201).body(novaConta);
	}

	@PutMapping
	public ResponseEntity<Conta> alterarConta(@RequestBody Conta conta) {
		Conta novaConta = repository.save(conta);
		return ResponseEntity.status(201).body(novaConta);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletarConta(@PathVariable Long id) {
		Optional<Conta> conta = repository.findById(id);
		repository.deleteById(id);
		return ResponseEntity.status(204).build();
	}
}
