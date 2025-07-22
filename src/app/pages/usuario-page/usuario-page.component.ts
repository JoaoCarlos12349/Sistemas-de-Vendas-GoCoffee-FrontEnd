import { Component } from '@angular/core';
import { Pessoa } from '../../models/pessoa';
import { LoginService } from '../../services/login.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-page.component.html',
  styleUrl: './usuario-page.component.css',
})
export class UsuarioPageComponent {
  pessoa?: Pessoa;
  usuario?: Usuario;

  constructor(
    private loginService: LoginService,
    private usuarioService: UsuarioService,
    private pessoaService: PessoaService,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.loginService.extrairDadosToken();

    this.carregaPessoa(token);
  }

  carregaPessoa(dadosToken: any) {
    this.usuarioService.listar().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuario = usuarios.find(
          (usuario) => usuario.login === dadosToken.sub
        );
        this.pessoa = usuarios.find(
          (usuario) => usuario.login === dadosToken.sub
        )?.pessoa;
      },
    });
  }

  sairAction(){
    this.router.navigate([""]);
  }

  manipulaDados() {
    const op = document.getElementById('btnAlterar') as HTMLButtonElement;

    if (op.textContent == 'Alterar') {
      const botoes =
        document.querySelectorAll<HTMLButtonElement>('.form-control');

      botoes.forEach((botao) => {
        botao.disabled = false;
      });

      op.textContent = 'Salvar';
      op.classList.remove('btn-warning');
      op.classList.add('btn-success');
    } else {
      debugger;
      const nomeIn = document.getElementById('nomeInput') as HTMLInputElement;
      const sexoIn = document.getElementById('sexoInput') as HTMLInputElement;
      const enderecoIn = document.getElementById(
        'enderecoInput'
      ) as HTMLInputElement;
      const cpfIn = document.getElementById('cpfInput') as HTMLInputElement;
      const pessoaSalvar = new Pessoa();
      pessoaSalvar.nome = nomeIn.value;
      pessoaSalvar.cpf = cpfIn.value;
      pessoaSalvar.endereco = enderecoIn.value;
      pessoaSalvar.sexo = sexoIn.value;
      pessoaSalvar.id = this.pessoa?.id ?? 0;

      this.pessoaService.salvar(pessoaSalvar).subscribe({
        next: (result) => {
          const usuario = new Usuario();
          const usuarioIn = document.getElementById(
            'usuarioInput'
          ) as HTMLInputElement;
          const senhaIn = document.getElementById(
            'senhaInput'
          ) as HTMLInputElement;
          usuario.id = this.usuario?.id ?? 0;
          usuario.login = usuarioIn.value;
          usuario.tipoUsuario = this.usuario?.tipoUsuario;
          if (usuario && senhaIn.value != '') {
            usuario.senha = senhaIn.value;
          }
          this.usuarioService.salvar(usuario).subscribe({
            next: () => {
              alert('Dados salvos com sucesso!');
              const botoes =
                document.querySelectorAll<HTMLButtonElement>('.form-control');

              botoes.forEach((botao) => {
                botao.disabled = true;
              });
              senhaIn.value = "";
              op.textContent = 'Alterar';
              op.classList.remove('btn-success');
              op.classList.add('btn-warning');
            },
          });
        },
      });
    }
  }
}
