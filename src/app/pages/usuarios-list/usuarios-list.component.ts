import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../models/pessoa';
import { LoginService } from '../../services/login.service';
import { Token } from '../../models/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css',
})
export class UsuariosListComponent {
  usuarios: Usuario[] = [];
  nomesPessoas: { [id: number]: string } = {};
  tipoUsuarioMap: { [key: string]: string } = {
    ADMIN: 'Administrador',
    FUNC: 'Funcionário',
    CLIENT: 'Cliente',
  };
  idSelect: number = -1;
  loginAntes: string = '';

  salvarUsuario() {
    debugger;
    const loginL = document.getElementById('loginInput') as HTMLInputElement;
    const tipoL = document.getElementById('tipoOP') as HTMLSelectElement;

    const usuario = new Usuario();
    usuario.login = loginL.value;
    usuario.tipoUsuario = tipoL.value;
    usuario.id = this.idSelect;

    this.usuarioService.salvar(usuario).subscribe({
      next: (usuario: Usuario) => {
        alert('Usuário alterado com sucesso!');
      },
    });
    const loginAtual = this.loginService.extrairDadosToken().sub;
    if (loginAtual == this.loginAntes) {
      this.router.navigate(['']);
    }
  }

  constructor(
    private usuarioService: UsuarioService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit() {
    this.usuarioService.listar().subscribe({
      next: (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
      },
    });
  }

  editarusuario(usuario: Usuario) {
    const loginL = document.getElementById('loginInput') as HTMLInputElement;
    const tipoL = document.getElementById('tipoOP') as HTMLSelectElement;

    const form = document.getElementById('formEditar') as HTMLFormElement;
    form.style.display = 'flex';

    loginL.value = usuario.login ?? '';
    this.loginAntes = usuario.login ?? '';
    tipoL.value = usuario.tipoUsuario ?? '';
    this.idSelect = usuario.id;
  }

  
}
