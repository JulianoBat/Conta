package com.criandoapi.projeto.entities;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.criandoapi.projeto.entities.enums.ContaEmpresa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Conta implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String contaEmpresa;
	private LocalDate dtVenc;
	private LocalDate dtPag;
	private LocalDate dtEmi;
	private LocalDate dtReg;
	private String statusConta;
	private Double valor;
	private Boolean atraso;

	public Conta() {

	}

	public Conta(Long id, String contaEmpresa, LocalDate dtVenc, LocalDate dtPag, LocalDate dtEmi,
			LocalDate dtReg, String statusConta, Double valor, Boolean atraso) {
		super();
		this.id = id;
		this.contaEmpresa = contaEmpresa;
		this.dtVenc = dtVenc;
		this.dtPag = dtPag;
		this.dtEmi = dtEmi;
		this.dtReg = dtReg;
		this.statusConta = statusConta;
		this.valor = valor;
		this.atraso = atraso;

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getContaEmpresa() {
		return contaEmpresa;
	}

	public void setContaEmpresa(String contaEmpresa) {
		this.contaEmpresa = contaEmpresa;
	}

	public LocalDate getDtVenc() {
		return dtVenc;
	}

	public void setDtVenc(LocalDate dtVenc) {
		this.dtVenc = dtVenc;
	}

	public LocalDate getDtPag() {
		return dtPag;
	}

	public void setDtPag(LocalDate dtPag) {
		this.dtPag = dtPag;
	}

	public LocalDate getDtEmi() {
		return dtEmi;
	}

	public void setDtEmi(LocalDate dtEmi) {
		this.dtEmi = dtEmi;
	}

	public LocalDate getDtReg() {
		return dtReg;
	}

	public void setDtReg(LocalDate dtReg) {
		this.dtReg = dtReg;
	}

	public String getStatusConta() {
		return statusConta;
	}

	public void setStatusConta(String statusConta) {
		this.statusConta = statusConta;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public Boolean getAtraso() {
		return atraso;
	}

	public void setAtraso(Boolean atraso) {
		this.atraso = atraso;
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Conta other = (Conta) obj;
		return Objects.equals(id, other.id);
	}

}
