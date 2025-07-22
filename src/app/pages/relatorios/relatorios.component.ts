import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { Pessoa } from '../../models/pessoa';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './relatorios.component.html',
  styleUrl: './relatorios.component.css',
})
export class RelatoriosComponent {
  
}
