import { Formatador } from "../util/Formatador";

export interface Filtro {
	nome: string;
	valor: string;
}

export class FiltroForm {
	private filtros: Array<Filtro> = new Array<Filtro>();


	public static criaPelaQueryParams(query: string) {
		const filtroForm: FiltroForm = new FiltroForm();
		query.replace('?', '').split('&')
			.filter((parametro: string) => !parametro.includes('paginaAtualContas'))
			.map((parametros) => {
				return {nome: parametros.split('=')[0], valor: parametros.split('=')[1]} as Filtro
			})
			.forEach((filtro) => filtroForm.addFiltro(filtro));
		return filtroForm;
	}

	public addFiltro(filtro: Filtro) {
		filtro.valor = decodeURIComponent(filtro.valor);
		if (filtro.nome.includes('data') && filtro.valor && !filtro.valor.includes('/')) {
			try {
				filtro.valor = Formatador.formatarDataPadraoBR(filtro.valor);
			} catch(e) {}
		}
		this.filtros.push(filtro);
	}


	public pegaFiltros(): Array<Filtro> {
		return this.filtros.filter((filtro: Filtro) => filtro.valor);
	}

	public pegaFiltrosInvalidos(): Array<Filtro> {
		return this.filtros.filter((filtro: Filtro) => !filtro.valor);
	}

	public temAlgumFiltro(): boolean {
		return !!this.pegaFiltros().length;
	}

	public pegaFiltrosQuery(): string {
		return this.temAlgumFiltro() ? "?" + this.pegaFiltros().
			map((filtro: Filtro) => `${filtro.nome}=${filtro.valor}`).join('&') : '';
	}

	public pegaFiltrosQueryDatas(): string {
		return this.pegaFiltrosDatas().length > 0 ? "?" + this.pegaFiltrosDatas().
			map((filtro: Filtro) => `${filtro.nome}=${filtro.valor}`).join('&') : '';
	}

	public pegaFiltrosDatas(): Array<Filtro> {
		return this.filtros.filter((filtro: Filtro) => filtro.nome.includes('data'));
	}

	public pegaValorFiltroPeloNome(nome: string): string | undefined {
		return this.filtros.find((filtro) => filtro.nome == nome)?.valor;
	}
}