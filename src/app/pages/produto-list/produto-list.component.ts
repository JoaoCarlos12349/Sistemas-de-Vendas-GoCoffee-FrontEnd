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
    estoque: '',
    observacao: '',
    situacao: false,
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
    const dispL = document.getElementById(
      'disponibilidadeInput'
    ) as HTMLInputElement;
    const observaL = document.getElementById(
      'observacaoInput'
    ) as HTMLInputElement;
    const estoqueL = document.getElementById(
      'estoqueInput'
    ) as HTMLInputElement;
    const categorialL = document.getElementById(
      'categoriaOP'
    ) as HTMLSelectElement;
    if (document.getElementById('salvaProduto')?.textContent != 'Alterar') {
      const formData = new FormData();
      formData.append('nome', nomeL.value);
      formData.append('preco', precoL.value);
      formData.append('estoque', estoqueL.value);
      formData.append('observacao', observaL.value);
      if (dispL.checked) {
        formData.append('situacao', 'true');
      } else {
        formData.append('situacao', 'false');
      }
      if (categorialL.value == '0') {
        const opOutro = document.getElementById('opOutro') as HTMLInputElement;
        formData.append('categoria', opOutro.value);
      } else {
        const categoriaTexto =
          categorialL.options[categorialL.selectedIndex].text;
        formData.append('categoria', categoriaTexto);
      }
      const obj: any = {};
      formData.forEach((value, key) => {
        obj[key] = value;
      });
      console.log(JSON.stringify(obj));

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
      produtoNovo.estoque = Number(estoqueL.value);
      produtoNovo.observacao = observaL.value;
      if (dispL.checked) {
        produtoNovo.situacao = true;
      } else {
        produtoNovo.situacao = false;
      }
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
    const dispL = document.getElementById(
      'disponibilidadeInput'
    ) as HTMLInputElement;
    const observaL = document.getElementById(
      'observacaoInput'
    ) as HTMLInputElement;
    const estoqueL = document.getElementById(
      'estoqueInput'
    ) as HTMLInputElement;
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
    dispL.checked = produto.situacao ?? false;
    dispL.value = (produto.situacao ?? false).toString();
    observaL.value = produto.observacao ?? '';
    estoqueL.value = (produto.estoque ?? 0).toString();
  }
}
