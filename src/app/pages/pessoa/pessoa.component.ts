import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../../services/pessoa.service';
import { UsuarioService } from '../../services/usuario.service';
import { Pessoa } from '../../models/pessoa';


@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html'
})
export class PessoaListComponent implements OnInit {
  pessoas: Pessoa[] = [];

  constructor(private pessoaService: PessoaService) {}

  ngOnInit(): void {
    this.getAllPessoas();
  }

  getAllPessoas(): void {
    this.pessoaService.getAll().subscribe((data) => {
      this.pessoas = data;
    });
  }
}
