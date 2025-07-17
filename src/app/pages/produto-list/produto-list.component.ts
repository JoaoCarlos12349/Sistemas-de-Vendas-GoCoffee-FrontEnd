import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdutoService } from '../../services/produto.service';
import { Produto } from '../../models/produto';
import $ from 'jquery';

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
    categoria: '',
  };

  produtos: Produto[] = [];
  categorias: any[] = [];

  idSelect: number = -1;

  ngOnInit() {
    this.produtoService.listar().subscribe({
      next: (data) => {
        this.produtos = data;
        this.categorias = Array.from(new Set(data.map((p) => p.categoria)));
      },
    });
  }

  imagemSelecionada!: File;

  constructor(private produtoService: ProdutoService) {}

  onFileSelected(event: any) {
    this.imagemSelecionada = event.target.files[0];
  }

  salvarProduto() {
    debugger;
    const nomeL = document.getElementById('nameInput') as HTMLInputElement;
    const precoL = document.getElementById('precoInput') as HTMLInputElement;
    const categorialL = document.getElementById(
      'categoriaOP'
    ) as HTMLSelectElement;
    if (document.getElementById('salvaProduto')?.textContent != 'Alterar') {
      const formData = new FormData();
      formData.append('nome', nomeL.value);
      formData.append('preco', precoL.value);
      if (categorialL.value == '0') {
        const opOutro = document.getElementById('opOutro') as HTMLInputElement;
        formData.append('categoria', opOutro.value);
      } else {
        const categoriaTexto =
          categorialL.options[categorialL.selectedIndex].text;
        formData.append('categoria', categoriaTexto);
      }

      formData.append('imagem', this.imagemSelecionada);
      this.produtoService.salvar(formData).subscribe({
        next: (produto: any) => {
          alert('Produto inserido com sucesso!');
          window.location.reload();
        },
      });
    } else {
      debugger;
      const produtoNovo = new Produto();
      produtoNovo.id = this.idSelect;
      produtoNovo.nome = nomeL.value;
      produtoNovo.preco = precoL.value;
      console.log(categorialL.value);
      if (categorialL.value == '0') {
        const opOutro = document.getElementById('opOutro') as HTMLInputElement;
        produtoNovo.categoria = opOutro.value;
      } else {
        produtoNovo.categoria = categorialL.value;
      }

      this.produtoService.alterar(produtoNovo).subscribe({
        next: () => {
          alert('Produto alterado com sucesso!');
          window.location.reload();
        },
      });
    }
  }

  abreOutro() {
    const op = document.getElementById('categoriaOP') as HTMLSelectElement;
    const opselect = op.value;

    if (opselect === '0') {
      const opOutro = document.getElementById('opOutro') as HTMLElement;
      opOutro.style.display = 'block';
    } else {
      const opOutro = document.getElementById('opOutro') as HTMLElement;
      opOutro.style.display = 'none';
    }
  }

  excluirProduto(id: number) {
    this.produtoService.excluir(id).subscribe({
      next: () => {
        alert('Produto Excluído com sucesso!');
        window.location.reload();
      },
    });
  }

  editarProduto(produto: Produto) {
    const nomeL = document.getElementById('nameInput') as HTMLInputElement;
    const precoL = document.getElementById('precoInput') as HTMLInputElement;
    const categorialL = document.getElementById(
      'categoriaOP'
    ) as HTMLSelectElement;

    const btn = document.getElementById('salvaProduto') as HTMLButtonElement;
    btn.textContent = 'Alterar';

    const imagemL = document.getElementById('imagemInput') as HTMLElement;
    imagemL.style.display = 'none';

    nomeL.value = produto.nome ?? '';
    precoL.value = produto.preco ?? '';
    categorialL.value = produto.categoria ?? '';
    this.idSelect = produto.id;
  }
}
