import { Component } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../app.config';
import { LoginService } from '../../services/login.service';
import { RouterModule } from '@angular/router';

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

  constructor(
    private produtoService: ProdutoService,
    private loginService: LoginService
  ) {
    this.urlImg = `${appSettings.apiBaseUrl}/produtos`;
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
        this.produtos = listProdutos;
        this.categorias = Array.from(
          new Set(listProdutos.map((p) => p.categoria))
        );
        this.cardapioFilter('Tudo');
      },
    });
  }

  carregaProdutos() {
    const cardsProdutos = document.getElementById('containerProdutos');
  }
}
