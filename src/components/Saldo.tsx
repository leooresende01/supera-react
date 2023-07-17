import { Formatador } from '../core/util/Formatador';
import './Saldo.css';

export interface Saldos {
	saldoTotal: number;
	saldoPeriodo: number;
}

export function Saldo (saldos: Saldos){
	return (
		<div className={'saldos-cotainer' + (saldos.saldoPeriodo === 0 && saldos.saldoTotal === 0 ? ' ocuta' : '')}>
			<p>Saldo total: R$ {Formatador.formatarMoedaReal(saldos.saldoTotal ?? 0)}</p>
			<p>Saldo no periodo: R$ {Formatador.formatarMoedaReal(saldos.saldoPeriodo ?? 0)}</p>
		</div>
	);
}