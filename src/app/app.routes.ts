import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';


export const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "cardapio", component: CardapioComponent}
];
