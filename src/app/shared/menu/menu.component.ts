import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(private loginService: LoginService, private router: Router) {}

  nivel = 'NIVEL0';

  menu = [
    {
      descricao: 'Cardápio',
      rota: '/cardapio',
      niveis: ['CLIENT', 'FUNC', 'ADMIN'],
    },
    { descricao: 'Cadastros', rota: '/Cadastros', niveis: ['FUNC', 'ADMIN'] },
    { descricao: 'Relatórios', rota: '/Relatórios', niveis: ['ADMIN'] },
  ];

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        const dadosToken = this.loginService.extrairDadosToken();

        if (dadosToken && dadosToken.roles) {
          this.nivel = dadosToken.roles.replace(/^ROLE_/, '');
        } else {
          console.warn(
            'Não foi possível determinar o nível do usuário a partir do token.'
          );
        }
      });
  }
}
