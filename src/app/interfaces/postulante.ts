import { Persona } from './persona';

export interface Postulante extends Persona {
  id?: number;
  Titulo?: string;
  Telefono?: number;
  FechaNacimiento?: Date;
  Persona?: Persona;
  Descripcion?: string;
  CiudadId?: number;
}

export interface Experiencia {
  id?: number;
  Descripcion: string;
  FechaFin: Date;
  FechaInicio: Date;
  NombreEmpresa: string;
  Presente: boolean;
  Puesto: string;
  PostulanteId: number;
}

export interface Formacion {
  id?: number;
  Descripcion: string;
  FechaFin: Date;
  FechaInicio: Date;
  TipoFormacion: TipoFormacion;
}

export interface TipoFormacion {
  Tipo: string;
}

export interface Habilidad {
  id?: number;
  TipoHabilidad: TipoHabilidad;
}

export interface TipoHabilidad {
  id?: number;
  Tipo: string;
}
