import { Component } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { Pessoa } from '../../models/pessoa';
import { Usuario } from '../../models/usuario';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  nivel = 'NIVEL0';
  pessoa?: Pessoa;

  menu = [
    {
      descricao: 'Cardápio',
      rota: '/cardapio',
      niveis: ['CLIENT', 'FUNC', 'ADMIN'],
    },
    { descricao: 'Cadastros', rota: '/gerenciar', niveis: ['FUNC', 'ADMIN'] },
    { descricao: 'Relatórios', rota: '/relatorios', niveis: ['ADMIN'] },
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url == '') {
          const menu = document.getElementById('menuP') as HTMLDivElement;
          menu.style.display = 'none';
        }
        const dadosToken = this.loginService.extrairDadosToken();
        this.nivelusuario(dadosToken);
        this.carregaPessoa(dadosToken);
        if (this.loginService.obterToken() != '') {
          const nomeHub = document.getElementById(
            'nameMenu'
          ) as HTMLLinkElement;
          nomeHub.style.display = 'block';
        }
      });
  }

  nivelusuario(dadosToken: any) {
    if (dadosToken && dadosToken.roles) {
      this.nivel = dadosToken.roles.replace(/^ROLE_/, '');
    } else {
      console.warn(
        'Não foi possível determinar o nível do usuário a partir do token.'
      );
    }
  }

  carregaPessoa(dadosToken: any) {
    this.usuarioService.listar().subscribe({
      next: (usuarios: Usuario[]) => {
        this.pessoa = usuarios.find(
          (usuario) => usuario.login === dadosToken.sub
        )?.pessoa;
      },
    });
  }
}

export function verficaToken() {
  debugger;
  const token = localStorage.getItem('Token');

  if (window.location.pathname === '/' && token == null) {
    localStorage.setItem('Token', '0');
    window.location.reload();
  }
}
