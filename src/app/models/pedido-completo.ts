import { Pedido } from "./pedido";

export interface PedidoCompleto {
  nomePessoa: string;
  cpfPessoa: string;
  dataPedido: string;
  nomePedido: string;
  valorPedido: number;
  pedidoAss: Pedido;
}
