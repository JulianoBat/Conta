package com.contasproject.contas.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contasproject.contas.DAO.IConta;
import com.contasproject.contas.entities.Conta;

@Controller
public class ContasController {

	@Autowired
	private IConta dao;

	@GetMapping("/conta")
	public List<Conta> listaConta() {
		return (List<Conta>) dao.findAll();
	}
}
