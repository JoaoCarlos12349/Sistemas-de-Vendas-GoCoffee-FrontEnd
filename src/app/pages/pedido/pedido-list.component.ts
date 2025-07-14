import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html'
})
export class PedidoListComponent implements OnInit {
  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.getAllPedidos();
  }

  getAllPedidos(): void {
    this.pedidoService.getAll().subscribe((data) => {
      this.pedidos = data;
    });
  }
}
