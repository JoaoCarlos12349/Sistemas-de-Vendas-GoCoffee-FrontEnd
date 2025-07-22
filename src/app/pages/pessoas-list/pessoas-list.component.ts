import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Pessoa } from '../../models/pessoa';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoas-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pessoas-list.component.html',
  styleUrl: './pessoas-list.component.css',
})
export class PessoasListComponent {
  pessoas: Pessoa[] = [];
  idSelect: number = -1;

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.pessoaService.listar().subscribe({
      next: (pesssoas: Pessoa[]) => {
        this.pessoas = pesssoas;
      },
    });
  }

  salvaPessoa() {
    const nomeI = document.getElementById('nomeInput') as HTMLInputElement;
    const sexoI = document.getElementById('sexoInput') as HTMLInputElement;
    const enderecoI = document.getElementById(
      'enderecoInput'
    ) as HTMLInputElement;

    const pessoa = new Pessoa();
    pessoa.nome = nomeI.value;
    pessoa.sexo = sexoI.value;
    pessoa.endereco = enderecoI.value;
    pessoa.pontuacao = 0;

    if (document.getElementById('salvaPessoa')?.textContent == 'Alterar') {
      pessoa.id = this.idSelect;
      this.pessoaService.salvar(pessoa).subscribe({
        next: () => {
          alert('Pessoa alterada com sucesso!');
          
        },
      });
    } else {
      this.pessoaService.salvar(pessoa).subscribe({
        next: () => {
          alert('Pessoa alterada com sucesso!');
        },
      });
    }
    window.location.reload();
  }

  editarPessoa(pessoa: Pessoa) {
    const nomeI = document.getElementById('nomeInput') as HTMLInputElement;
    const sexoI = document.getElementById('sexoInput') as HTMLInputElement;
    const enderecoI = document.getElementById(
      'enderecoInput'
    ) as HTMLInputElement;

    const btn = document.getElementById('salvaPessoa') as HTMLButtonElement;
    btn.textContent = 'Alterar';

    nomeI.value = pessoa.nome ?? '';
    sexoI.value = pessoa.sexo ?? '';
    enderecoI.value = pessoa.endereco ?? '';
    this.idSelect = pessoa.id;
  }

  excluirPessoa(id: number) {
    this.pessoaService.excluir(id).subscribe({
      next: () => {
        alert('Pessoa excluída com sucesso!');
        window.location.reload();
      },
      error: (error: any) => {
        alert("Cliente está vinculada à uma conta existente e não pode ser excluído!")
      }
    });
  }
}
