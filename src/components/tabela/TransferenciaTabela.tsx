import "bootstrap/dist/css/bootstrap.min.css";
import "./TransferenciaTabela.css";
import { TransferenciaDto } from "../../core/dto/TransferenciaDto";
import { Formatador } from "../../core/util/Formatador";

interface TabelaParametros {
	transferencias: Array<TransferenciaDto>;
}

export function TransferenciaTabela(tabelaPars: TabelaParametros) {
	return (
		<>
			<table className="table table-bordered">
				<thead>
					<tr>
						<th scope="col">Dados</th>
						<th scope="col">Valencia</th>
						<th scope="col">Tipo</th>
						<th scope="col">Nome do operador transacionado</th>
					</tr>
				</thead>
				{
					tabelaPars.transferencias.length > 0 ?
						<tbody>
							{(tabelaPars.transferencias.map((transferencia) => (
								<><tr key={transferencia.id}>
									<td>{Formatador.formatarDataPadraoBR(transferencia.data.toString())}</td>
									<td>R$ {Formatador.formatarMoedaReal(transferencia.valor)}</td>
									<td>{transferencia.tipoTransacao}</td>
									<td>{transferencia.nomeOperadorTransacao}</td>
								</tr ></>
							)))}
						</tbody>
						: null}
			</table>
			{tabelaPars.transferencias.length <= 0 ? (
				<div className="registro-nao-existe">
					<p>Nenhuma transferencia encontada</p>
				</div>
			) : null}</>
	);
}