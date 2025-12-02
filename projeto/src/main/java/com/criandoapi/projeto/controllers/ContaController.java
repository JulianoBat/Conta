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
import com.criandoapi.projeto.services.ContaService;

@RestController
@CrossOrigin("*")
@RequestMapping("/conta")
public class ContaController {

	@Autowired
	private ContaService service;

	@GetMapping
	public ResponseEntity<List<Conta>> listaConta() {
		return ResponseEntity.status(200).body(service.listarConta());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Conta> listaContaId(@PathVariable(value="id")long id) {
		return ResponseEntity.status(200).body(service.contaId(id));
	}

	@PostMapping
	public ResponseEntity<Conta> registrarConta(@RequestBody Conta conta) {
		return ResponseEntity.status(201).body(service.criarConta(conta));
	}

	@PutMapping("/{id}")
	public ResponseEntity<Conta> alterarConta(@PathVariable long id, @RequestBody Conta conta) {
		return ResponseEntity.status(201).body(service.alterarConta(id, conta));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletarConta(@PathVariable Long id) {
		service.excluirConta(id);
		return ResponseEntity.status(204).build();
	}
}
