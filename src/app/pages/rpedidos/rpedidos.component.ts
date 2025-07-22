import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Pessoa } from '../../models/pessoa';
import { Usuario } from '../../models/usuario';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { PessoaService } from '../../services/pessoa.service';
import { PedidoCompleto } from '../../models/pedido-completo';
import { ItemService } from '../../services/item.service';
import { ItemPedido } from '../../models/item-pedido';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rpedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rpedidos.component.html',
  styleUrl: './rpedidos.component.css',
})
export class RpedidosComponent {
  pedidos: Pedido[] = [];
  pessoas: Pessoa[] = [];
  usuarios: Usuario[] = [];
  pedidosCompleto: PedidoCompleto[] = [];
  valorCompleto: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private pessoaService: PessoaService,
    private itemService: ItemService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.pedidoService.listar().subscribe({
      next: (pedidos: Pedido[]) => {
        this.usuarioService.listar().subscribe({
          next: (usuarios: Usuario[]) => {
            this.pessoaService.listar().subscribe({
              next: (pessoas: Pessoa[]) => {
                this.itemService.listar().subscribe({
                  next: (itens: ItemPedido[]) => {
                    this.produtoService.listar().subscribe({
                      next: (produtos: Produto[]) => {
                        this.pedidosCompleto = pedidos.map((pedido) => {
                          const usuario = usuarios.find(
                            (u) => u.id === pedido.usuario_id
                          );
                          const pessoa = pessoas.find(
                            (p) => p.id === usuario?.pessoa?.id
                          );

                          const itensDoPedido = itens.filter(
                            (item) => item.idPedido === pedido.id
                          );

                          const nomesProdutos = itensDoPedido
                            .map((item) => {
                              const produto = produtos.find(
                                (p) => p.id === item.idProduto
                              );
                              const nome =
                                produto?.nome ?? 'Produto Desconhecido';
                              return `${item.quantidade}x${nome}`;
                            })
                            .join(' + ');

                          return {
                            nomePessoa: pessoa?.nome ?? '',
                            cpfPessoa: pessoa?.cpf ?? '',
                            dataPedido: this.formatarDataParaString(pedido.data ?? ""),
                            nomePedido: nomesProdutos ?? '',
                            valorPedido: pedido.valorTotal ?? 0,
                            pedidoAss: pedido,
                          };
                        });
                        this.valorCompleto = pedidos.reduce((total, pedido) => total + (pedido.valorTotal ?? 0), 0);
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
  }

  formatarDataParaString(data: Date | string): string {
    const d = new Date(data);

    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    const hora = String(d.getHours()).padStart(2, '0');
    const minuto = String(d.getMinutes()).padStart(2, '0');
    const segundo = String(d.getSeconds()).padStart(2, '0');

    return `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  }

  changeStatus(pedido: PedidoCompleto) {
    const status = document.getElementById('situacaoOP') as HTMLSelectElement;

    pedido.pedidoAss.situacao = status.value;
    this.pedidoService.salvar(pedido.pedidoAss).subscribe();
  }
}
