import { useLocation } from "react-router-dom";
import { FiltroForm } from "../../core/form/FiltroForm";
import "./input.css";
import "./InputDados.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import React from "react";

export interface InputCampos {
	descricao: string; 
	name: string,
	dados: Array<string>;
	setValorInput: React.Dispatch<React.SetStateAction<string>>;
}

export function InputDados(campos: InputCampos): JSX.Element {
	const location = useLocation();
	const filtroForm = FiltroForm.criaPelaQueryParams(location.search);
	const valorCampo = filtroForm.pegaValorFiltroPeloNome(campos.name);
	const [valor, setValor] = useState<string>(valorCampo ?? '');
	const [inputFocus, setinputFocus] = useState<boolean>(false);

	const handleChange = (event: any) => {
    	const value = event.target.value;
    	setValor(value);
  	};
	
	function onInputHandler(event: any): void {
		campos.setValorInput(event.target.value);
	}

	function handleClick(event: any): void {
		setValor(event.target.textContent);
	}

	function inputFocusSet(valor: boolean) {
		setTimeout(() => setinputFocus(valor), 300);
	}

	return (
		<div className="container-input">
			<label className="form-label" htmlFor={"campo" + campos.name}>{campos.descricao}</label>
			<input autoComplete="off" onFocus={(e) => inputFocusSet(true)} onBlur={(e) => inputFocusSet(false)} onInput={onInputHandler} onChange={handleChange} value={valor}
				className="form-control" name={campos.name} type="texto"/>
			<ul
				onClick={handleClick} className={"dados" + " " + (campos.dados.length <= 0 || 
					 !inputFocus ? 'ocuta' : '')}>
				{campos.dados.map((dado: string) => (<li className="dado">{dado}</li>))}
			</ul>
		</div>
	);
}