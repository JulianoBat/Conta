package com.contasproject.contas.entities.enums;

public enum ContaEmpresa {

	ENEL(1),
	SABESP(2),
	VIVO(3),
	COHAB(4),
	CLARO(5);
	
	private int code;
	
	private ContaEmpresa(int code) {
		this.code = code;
	}
	
	public int getCode() {
		return code;
	}
	
	public static ContaEmpresa valueOf(int code) {
		for (ContaEmpresa value : ContaEmpresa.values()) {
			if (value.getCode() == code) {
				return value;
			}
		}
		throw new IllegalArgumentException("Invalid OrderStatus code");
	}
}
