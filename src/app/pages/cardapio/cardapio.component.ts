import { Component } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';
import { appSettings } from '../../app.config';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  produtos?: Produto[];
  urlImg?: String;

  constructor(private produtoService: ProdutoService) {
    this.urlImg = `${appSettings.apiBaseUrl}/produtos`;
  }

  ngOnInit() {
    this.produtoService.listar().subscribe({
      next: (listProdutos: Produto[]) => {
        this.produtos = listProdutos;
        console.log(this.produtos);
      },
    });
  }

  carregaProdutos() {
    const cardsProdutos = document.getElementById('containerProdutos');
  }
}
