import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PessoaListComponent } from './pages/pessoa/pessoa.component';

import { ResgatePontuacaoComponent } from './pages/resgate-pontuacao/resgate-pontuacao.component';
import { ProdutoListComponent } from './pages/produto-list/produto-list.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { PedidoListComponent } from './pages/pedido-list/pedido-list.component';

export const routes: Routes = [
    {path: "", component: IndexComponent},
    {path: "cadastro", component: CadastroComponent},
    {path: "cardapio", component: CardapioComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'pessoas', component: PessoaListComponent },
    { path: 'pedidos', component: PedidoListComponent },
    { path: 'produtos', component: ProdutoListComponent },
    { path: 'historico', component: HistoricoComponent },
    { path: 'resgatar', component: ResgatePontuacaoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
