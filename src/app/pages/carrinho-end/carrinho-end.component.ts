import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItemPedido } from '../../models/item-pedido';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import { Router, RouterModule } from '@angular/router';
import { Pedido } from '../../models/pedido';
import { Usuario } from '../../models/usuario';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { PedidoService } from '../../services/pedido.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-carrinho-end',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './carrinho-end.component.html',
  styleUrl: './carrinho-end.component.css',
})
export class CarrinhoEndComponent {
  formaPagamento: string = 'PIX';
  carrinho: ItemPedido[] = [];
  produtos: Produto[] = [];
  pedido: string = '';
  valorTotal: number = 0;
  usuario?: Usuario;

  constructor(
    private produtoService: ProdutoService,
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private itemService: ItemService,
    private router: Router,
  ) {}

  ngOnInit() {
    const token = this.loginService.extrairDadosToken();

    this.carregaPessoa(token);
    this.carrinho = JSON.parse(localStorage.getItem('carrinho') ?? '[]');
    this.produtoService.listar().subscribe({
      next: (lista: Produto[]) => {
        this.produtos = lista;
        const nomes = this.carrinho
          .map(
            (item) => this.produtos.find((p) => p.id === item.idProduto)?.nome
          )
          .filter((nome) => !!nome);

        this.pedido = nomes.join(' + ');
        console.log(this.pedido);

        this.valorTotal = this.carrinho.reduce(
          (acc, item) => acc + (item.subtotal ?? 0),
          0
        );
      },
    });
  }

  carregaPessoa(dadosToken: any) {
    this.usuarioService.listar().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuario = usuarios.find(
          (usuario) => usuario.login === dadosToken.sub
        );
      },
    });
  }

  finalizaPedido() {
    debugger;
    const mesa = document.getElementById('mesaOP') as HTMLSelectElement;
    const pedido = new Pedido();
    pedido.data = new Date();
    pedido.mesa = Number(mesa.value);
    pedido.pontos = Math.floor(this.valorTotal);
    pedido.valorTotal = this.valorTotal;
    pedido.usuario_id = this.usuario?.id ?? 0;
    pedido.formaPagamento = this.formaPagamento;

    if (mesa.value != null) {
      this.pedidoService.salvar(pedido).subscribe({
        next: (pedidoCriado: Pedido) => {
          this.carrinho.forEach((itemCarrinho) => {
            const itemPedido = new ItemPedido();
            itemPedido.idPedido = pedidoCriado.id;
            itemPedido.idProduto = itemCarrinho.idProduto;
            itemPedido.quantidade = itemCarrinho.quantidade;
            itemPedido.subtotal = itemCarrinho.subtotal ?? 0;
            console.log(itemPedido);

            this.itemService.salvar(itemPedido).subscribe({
              error: (err) => console.error('Erro ao salvar item:', err),
            });
          });

          alert('Pedido realizado com sucesso');
          this.router.navigate(["/cardapio"]);
        },
        error: (err) => {
          console.error('Erro ao salvar pedido:', err);
          alert('Erro ao salvar o pedido');
        },
      });
    }
  }
}
