export class Pedido {
    id!: number; 
    data?: Date;
    mesa?: number;
    situacao?: string;
    valorTotal?: number;
    pontos?: number;
    usuario_id!: number;
    formaPagamento?: string;
}
