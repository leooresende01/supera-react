import { useNavigate, useSearchParams } from "react-router-dom";
import { Filtro, FiltroForm } from "../../core/form/FiltroForm";
import { Input } from "../input/Input";
import "./FormFiltroTransferencia.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputDados } from "../input/InputDados";
import { useEffect, useState } from "react";
import { TransferenciaService } from "../../core/service/TransferenciaService";

export interface FormParams {
	id: number;
}

export function FormFiltroTransferencia(formParams: FormParams) {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [inputDadosValor, setInputDadosValor] = useState<string>('');
	const [nomesOperadoresTransacao, setNomesOperadoresTransacao] = useState<Array<string>>([]);
	const paginaAtualContas: string | null = searchParams.get('paginaAtualContas');
	const transferenciaService = TransferenciaService.getInstance();

	useEffect(() => {
		(async () => {
			setNomesOperadoresTransacao([]);
			inputDadosValor && setNomesOperadoresTransacao(
				await transferenciaService.buscaOperadoresContendo(formParams.id, inputDadosValor)
			);
		})();
	}, [inputDadosValor]);

	async function handleSubmit(e: any) {
		e.preventDefault();
		const formData: FormData = new FormData(e.target);
		const filtros: FiltroForm = new FiltroForm();
		formData.forEach((valor, chave) =>
			filtros.addFiltro({ nome: chave, valor: valor.toString() }));
		navigate(`/contas/${formParams.id}/transferencias`);
		filtros.pegaFiltrosInvalidos().forEach((filtro: Filtro) => searchParams.delete(filtro.nome));
		filtros.pegaFiltros().forEach((filtro) => searchParams.set(filtro.nome, filtro.valor));
		paginaAtualContas && searchParams.set('paginaAtualContas', paginaAtualContas);
		setSearchParams(searchParams);
	}
	return (
		<form className="container-formulario" onSubmit={handleSubmit}>
			<div className="container-campo">
				<Input descricao="Data de Início" name="dataInicio" tipo="date" />
				<Input descricao="Data de Fim" name="dataFim" tipo="date" />
				<InputDados setValorInput={setInputDadosValor} descricao="Nome do operador transacionado" name="nomeOperadorTransacao" dados={nomesOperadoresTransacao} />
			</div>
			<button className="botaoEnviar btn btn-primary mt-5 p-2 pe-5 ps-5" type="submit">Pesquisar</button>
		</form>
	);
}