import { Usuario } from './usuarios';

export interface Persona extends Usuario {
  id?: number;
  Nombre: string;
  Apellido: string;
}
