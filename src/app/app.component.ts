import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/menu/menu.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sistemas-de-Vendas-GoCoffee-FrontEnd';
  exibirNavbar = true;

  rotasSemNavbar = ['/']; // adicione as rotas onde a navbar não deve aparecer

}
