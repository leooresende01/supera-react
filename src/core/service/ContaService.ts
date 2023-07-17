import { ContasIdsDto } from "../dto/ContasIdsDto";

export class ContaService {
	private host: string = 'http://192.168.0.74';
	quantidade: number = 5;

	public async buscaIdsDasContas(paginaAtualContas: number): Promise<ContasIdsDto> {
		const req = await 
			fetch(`${this.host}/api/v1/contas/id?paginaAtual=${paginaAtualContas}&quantidade=${this.quantidade}`);
		return req.json();
	}

	public static getInstance(): ContaService {
		return new ContaService();
	}
}