import { Opcion } from "./opcion";

export interface Pregunta{
	id?: string;
	coachId: string;
	fechaActualizacion: Date;
	areaConocimiento: string;
	descriptor: string;
	tipoPregunta: string;
	pregunta: string;
	opciones: Opcion[];
}
