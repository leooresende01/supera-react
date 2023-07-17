export interface TransferenciaDto {
	id: number;
    contaId: number;
    data: Date;
    valor: number;
    tipoTransacao: string;
    nomeOperadorTransacao: string;
}