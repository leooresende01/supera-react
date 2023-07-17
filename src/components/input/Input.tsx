import { useLocation } from "react-router-dom";
import "./input.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiltroForm } from "../../core/form/FiltroForm";
import { Formatador } from "../../core/util/Formatador";

export interface InputCampos {
	descricao: string; 
	name: string, 
	tipo: string;
}

export function Input(campos: InputCampos): JSX.Element {
	const location = useLocation();
	const filtroForm = FiltroForm.criaPelaQueryParams(location.search);
	const valorCampo = filtroForm.pegaValorFiltroPeloNome(campos.name);
	return (
		<div className="container-input">
			<label className="form-label" htmlFor={"campo" + campos.name}>{campos.descricao}</label>
			<input defaultValue={campos.name.includes('data') ? 
				Formatador.formatarDataPadraoInput(valorCampo) : valorCampo} 
				className="form-control" name={campos.name} type={campos.tipo}></input>
		</div>
	);
}