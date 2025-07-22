import { Component } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../app.config';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido';
import { ItemPedido } from '../../models/item-pedido';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  produtos?: Produto[];
  urlImg?: String;
  categorias: any[] = [];
  categoriasFilter: any[] = [];
  categoriaSelecionada: string = 'Tudo';
  cProdutos: Produto[] = [];
  cItens: ItemPedido[] = [];

  constructor(
    private produtoService: ProdutoService,
    private loginService: LoginService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.urlImg = `${appSettings.apiBaseUrl}/produtos`;
  }

  modificaCarrinho(produto: Produto, action: number) {
    debugger;
    if (this.cItens.length == 0) {
      if (action == 1) {
        if (!this.cProdutos.includes(produto)) {
          const item = new ItemPedido();
          item.idProduto = produto.id;
          item.quantidade = 1;
          item.subtotal = Number(produto.preco) * item.quantidade;
          this.cProdutos.push(produto);
          this.cItens.push(item);
          console.log(this.cItens);
        }
      }
    } else {
      if (action == 1) {
        if (!this.cProdutos.includes(produto)) {
          const item = new ItemPedido();
          item.idProduto = produto.id;
          item.quantidade = 1;
          item.subtotal = Number(produto.preco) * item.quantidade;
          this.cProdutos.push(produto);
          this.cItens.push(item);
          console.log(this.cItens);
        } else {
          const item = this.cItens.find(
            (item) => item.idProduto === produto.id
          );
          if (item) {
            item.quantidade = item.quantidade + 1;
            item.subtotal = Number(produto.preco) * item.quantidade;
          }
        }
      } else if (action == -1) {
        if (this.cProdutos.includes(produto)) {
          const item = this.cItens.find(
            (item) => item.idProduto === produto.id
          );
          if (item) {
            if (item.quantidade > 0) {
              item.quantidade = item.quantidade - 1;
            }
            item.subtotal = Number(produto.preco) * item.quantidade;
          }
        }
      }
    }
  }

  temItensNoCarrinho(): boolean {
    return this.cItens.some((item) => item.quantidade > 0);
  }

  retornaQuantidade(produto: Produto): number {
    const item = this.cItens.find((item) => item.idProduto === produto.id);
    return item ? item.quantidade : 0;
  }

  cardapioFilter(categoria: string) {
    this.categoriaSelecionada = categoria;

    if (categoria == 'Tudo') {
      this.categoriasFilter = this.produtos ?? [];
    } else {
      this.categoriasFilter = (this.produtos ?? []).filter(
        (produto) => produto.categoria === categoria
      );
    }
  }

  ngOnInit() {
    this.cardapioFilter('Tudo');
    this.loginService.permissaoAcesso();
    this.produtoService.listar().subscribe({
      next: (listProdutos: Produto[]) => {
        const produtosAtivos = listProdutos.filter(p => p.situacao === true);
        this.produtos = produtosAtivos;
        this.categorias = Array.from(
          new Set(this.produtos.map((p) => p.categoria))
        );
        this.cardapioFilter('Tudo');
      },
    });
  }

  carregaProdutos() {
    const cardsProdutos = document.getElementById('containerProdutos');
  }

  goToCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(this.cItens));
    this.router.navigate(["carrinho"]);
  }
}
