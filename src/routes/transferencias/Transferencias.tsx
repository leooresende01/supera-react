import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { FormFiltroTransferencia } from "../../components/form/FormFiltroTransferencia";
import './Transferencias.css';
import { TransferenciaTabela } from "../../components/tabela/TransferenciaTabela";
import { TransferenciaService } from "../../core/service/TransferenciaService";
import { TransferenciaDto } from "../../core/dto/TransferenciaDto";
import { useEffect, useState } from "react";
import { SpinnerBootstrap } from '../../components/shared/SpinnerBootstrap';
import { Saldo, Saldos } from "../../components/Saldo";
import { FiltroForm } from "../../core/form/FiltroForm";
import { ContasSelecionar } from "../../components/Contas/ContasSelecionar";
import { ContaService } from "../../core/service/ContaService";
import { ContasIdsDto } from "../../core/dto/ContasIdsDto";

export default function Transferencia() {
	const transferenciaService = TransferenciaService.getInstance();
	const contaService = ContaService.getInstance();
	const location = useLocation();
	const params = useParams();
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [transferencias, setTransferencias] = useState<Array<TransferenciaDto> | null>(null);
	const [saldos, setSaldos] = useState<Saldos | null>(null);
	const [contasIdDto, setContasIdDto] = useState<ContasIdsDto | null>(null);
	const [paginaAtualContas, setPaginaAtualContas] = useState<number>(Number(searchParams.get('paginaAtual')) ?? 0);
	const [hasErros, setHasErros] = useState<boolean>(false);
	const id: number = Number(params.id);
	let estaBuscandoTransferencias: boolean = false;
	let estaBuscandoIds: boolean = false;

	function resetaTransferenciasSaldos() {
		setTransferencias(null);
		setSaldos(null);
	}

	useEffect(() => {
		if (estaBuscandoIds) return;
		estaBuscandoIds = true;
		(async () => {
			try {
				const idContas = await contaService.buscaIdsDasContas(paginaAtualContas);
				if (!idContas.ids.length) {
					navigate(`/contas/${id}/transferencias`);
					searchParams.set('paginaAtualContas', '0');
					setSearchParams(searchParams);
					return;
				}
				setContasIdDto(idContas);
				const primeiroId = idContas.ids.includes(id) ? id : idContas.ids[0];
				navigate(`/contas/${primeiroId ?? id}/transferencias${location.search}`);
				if (id) setHasErros(false);
			} catch (e) { setHasErros(true) }
			estaBuscandoIds = false;
		})();
	}, [paginaAtualContas]);

	useEffect(() => {
		if (estaBuscandoTransferencias) return;
		const novaPaginaContas: number = Number(searchParams.get('paginaAtualContas'));
		setPaginaAtualContas(novaPaginaContas ?? paginaAtualContas);
		const filtroForm = FiltroForm.criaPelaQueryParams(location.search);
		(async () => {
			estaBuscandoTransferencias = true;
			try {
				resetaTransferenciasSaldos();
				if (isNaN(id)) return;
				const transferenciasDto = await transferenciaService
					.buscaTransferenciasComFiltro(id, filtroForm);
				setTransferencias(transferenciasDto);
				setSaldos(await transferenciaService.buscaSaldos(id, filtroForm));
				setContasIdDto(await contaService.buscaIdsDasContas(paginaAtualContas));
				if (transferencias) setHasErros(false);
			} catch (e) { setHasErros(true) }
			estaBuscandoTransferencias = false;
		})();
	}, [location, params]);
	return (
		<div>
			{hasErros && (<div className="alert alert-danger" role="alert">
				Ocorreu um erro no servidor
			</div>)}
			<div className="espaco">
				<FormFiltroTransferencia id={id} />
				<div className="transferencias-container">
					{transferencias == null || saldos == null || contasIdDto == null ? (<SpinnerBootstrap />) :
						(<>
							<Saldo saldoTotal={saldos.saldoTotal} saldoPeriodo={saldos.saldoPeriodo} />
							<TransferenciaTabela transferencias={transferencias} />
							<ContasSelecionar paginaAtual={paginaAtualContas}
								setPaginaAtualContas={setPaginaAtualContas} idAtual={id}
								contasIdDto={contasIdDto} />
						</>)
					}
				</div>
			</div>
		</div>
	);
}