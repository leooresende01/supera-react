import { SaldoDto } from './../dto/SaldoDto';
import { Saldos } from "../../components/Saldo";
import { TransferenciaDto } from "../dto/TransferenciaDto";
import { Filtro, FiltroForm } from "../form/FiltroForm";

export class TransferenciaService {
	private readonly host: string = "http://192.168.0.74";
	public async buscaSaldos(id: number, filtroForm: FiltroForm): Promise<Saldos> {
		const query: string = filtroForm.pegaFiltrosQueryDatas();
		return await this.buscaSaldoTotalTransferenciasConta(id, query);
	}

	public async buscaTransferenciasComFiltro(idConta: number, filtros?: FiltroForm): Promise<Array<TransferenciaDto>> {
		try {
			const filtrosQuery = filtros?.pegaFiltrosQuery() ?? '';
			const req = await fetch(`${this.host}/api/v1/contas/${idConta}/transferencias` + filtrosQuery);
			if (req.ok) {
				return req.json();
			} throw new Error();
		} catch (e) {
			return [];
		}
	}

	public async buscaSaldoTotalTransferenciasConta(idConta: number, query: string): Promise<SaldoDto> {
		try {
			const req = await fetch(`${this.host}/api/v1/contas/${idConta}/transferencias/saldos${query ?? ''}`);
			return req.json();
		} catch (e) {
			return { saldoTotal: 0, saldoPeriodo: 0 };
		}
	}

	public async buscaOperadoresContendo(idConta: number, texto: string): Promise<Array<string>> {
		try {
			const req = await fetch(`${this.host}/api/v1/contas/${idConta}/transferencias/nome-operador-transacao/${texto}`);
			return req.json();
		} catch (e) {
			return [];
		}
	}

	public static getInstance(): TransferenciaService {
		return new TransferenciaService();
	}
}