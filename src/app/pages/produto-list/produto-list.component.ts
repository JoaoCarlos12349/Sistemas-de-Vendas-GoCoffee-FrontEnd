import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.css',
})
export class ProdutoListComponent {
  produto = {
    nome: '',
    preco: '',
  };

  imagemSelecionada!: File;

  constructor(private produtoService: ProdutoService) {}

  onFileSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  salvarProduto() {
    debugger;
    const formData = new FormData();
    formData.append('nome', this.produto.nome);
    formData.append('preco', this.produto.preco.toString());
    formData.append('categoria', " ");
    formData.append('imagem', this.imagemSelecionada);

    this.produtoService.salvar(formData).subscribe({
      next: (produto: any) => {
        console.log(produto);
      },
    });
  }
}
