import moment from 'moment';

export class Formatador {
	public static formatarMoedaReal(valor: number): string {
		return valor.toLocaleString('pt-Br', { currency: 'BRL', style: 'currency' })
			.replaceAll(/[R$\s]/g, '');
	}

	public static formatarDataPadraoBR(data: string): string {
		return moment(data).format('DD/MM/YYYY');
	}

	static formatarDataPadraoInput(data: string | undefined): string {
		if (!data) return '';
		let [day, month, year] = data.split('/');
		return moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');
	}
}