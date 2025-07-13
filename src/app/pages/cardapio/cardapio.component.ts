import { Component } from '@angular/core';
import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css',
})
export class CardapioComponent {
  produtos?: Produto[];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.produtoService.listar().subscribe({
      next: (listProdutos: Produto[]) => {
        this.produtos = listProdutos;
      },
    });
  }

  carregaProdutos() {
    const cardsProdutos = document.getElementById("containerProdutos");


  }
}
