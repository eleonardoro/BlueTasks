package com.eleonardo.bluestasks.infraestructure.web;

import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;

import lombok.Getter;

@Getter
public class RestResponseError {

	private String error;

	public RestResponseError() {
	}

	public static RestResponseError fromValidationError(Errors errors) {
		RestResponseError resp = new RestResponseError();
		StringBuilder sb = new StringBuilder();

		for (ObjectError error : errors.getAllErrors()) {
			sb.append(error.getDefaultMessage()).append(" ");
		}

		resp.error = sb.toString();
		return resp;
	}
	
	public static RestResponseError fromMessage(String error) {
		RestResponseError resp = new RestResponseError();
		resp.error = error;
		return resp;
	}

}
