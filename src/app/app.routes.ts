import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { CardapioComponent } from './pages/cardapio/cardapio.component';

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResgatePontuacaoComponent } from './pages/resgate-pontuacao/resgate-pontuacao.component';
import { ProdutoListComponent } from './pages/produto-list/produto-list.component';
import { HistoricoComponent } from './pages/historico/historico.component';
import { PedidoListComponent } from './pages/pedido-list/pedido-list.component';
import { GerenciarComponent } from './pages/gerenciar/gerenciar.component';
import { PessoasListComponent } from './pages/pessoas-list/pessoas-list.component';
import { UsuariosListComponent } from './pages/usuarios-list/usuarios-list.component';
import { UsuarioPageComponent } from './pages/usuario-page/usuario-page.component';
import { CarrinhoEndComponent } from './pages/carrinho-end/carrinho-end.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { RpedidosComponent } from './pages/rpedidos/rpedidos.component';
import { RvendasComponent } from './pages/rvendas/rvendas.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'gerenciar', component: GerenciarComponent },
  { path: 'cardapio', component: CardapioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'pedidos', component: PedidoListComponent },
  { path: 'produtos', component: ProdutoListComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'resgatar', component: ResgatePontuacaoComponent },
  { path: 'gprodutos', component: ProdutoListComponent },
  { path: 'gpessoas', component: PessoasListComponent },
  { path: 'gusuarios', component: UsuariosListComponent },
  { path: 'usuariopage', component: UsuarioPageComponent },
  { path: 'carrinho', component: CarrinhoEndComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: 'rpedidos', component: RpedidosComponent },
  { path: 'rvendas', component: RvendasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
