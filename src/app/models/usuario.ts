import { Pessoa } from "./pessoa";

export class Usuario {
  id!: number;
  login?: string;
  senha?: string;
  tipoUsuario?: string;
  pessoa!: Pessoa;
}
