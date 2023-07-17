import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './ContasSelecionar.css';
import { ContasIdsDto } from '../../core/dto/ContasIdsDto';

interface ContaSelecionadaParams {
	idAtual: number;
	contasIdDto: ContasIdsDto;
	setPaginaAtualContas: React.Dispatch<React.SetStateAction<number>>;
	paginaAtual: number;
}

export function ContasSelecionar(csParams: ContaSelecionadaParams) {
	const navigate = useNavigate();
	const location = useLocation();
	const [searchParams, setSearchParams] = useSearchParams();
	const idsContas = csParams.contasIdDto.ids;

	function ehUltimoId(): boolean {
		return idsContas[idsContas.length - 1] === csParams.idAtual;
	}


	function ehPrimeiroId(): boolean {
		return idsContas[0] === csParams.idAtual;
	}

	function mudaDeConta(contaId: string | number): void {
		navigate(`/contas/${contaId}/transferencias${location.search}`);
	}

	function mudaPaginaIdContas(paginaAtual: string | number): void {
		navigate(`/contas/${csParams.idAtual}/transferencias${location.search}`);
		searchParams.set('paginaAtualContas', String(paginaAtual));
		setSearchParams(searchParams);
	}

	function contaSelecionada(event: any): void {
		const valor: string | number = event.target.textContent;
		if (!isNaN(Number(valor))) {
			mudaDeConta(valor);
		} else if (valor === '>') {
			mudaDeConta(csParams.idAtual + 1);
		} else if (valor === '<') {
			mudaDeConta(csParams.idAtual - 1);
		} else if (valor === '>>') {
			mudaPaginaIdContas(csParams.paginaAtual + 1);
		} else if (valor === '<<') {
			mudaPaginaIdContas(csParams.paginaAtual - 1);
		}
	}

	return (
		<div className="contas-ids-cotainer" onClick={contaSelecionada}>
			<span className={csParams.contasIdDto.primeiraPagina ? 'desabilitar-nav-ids' : ''}>{'<<'}</span>
			<span className={ehPrimeiroId() ? 'desabilitar-nav-ids' : ''}>{'<'}</span>
			{idsContas.map((id: number) => {
				return <span key={id} className={csParams.idAtual == id ? 'selecionada desativar-eventos' : ''}>{id}</span>
			})}
			<span className={ehUltimoId() ? 'desabilitar-nav-ids' : ''}>{'>'}</span>
			<span className={csParams.contasIdDto.ultimaPagina ? 'desabilitar-nav-ids' : ''}>{'>>'}</span>
		</div>
	);
}