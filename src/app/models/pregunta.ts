import { Opcion } from "./opcion";

export interface Pregunta{
	id?: string;
	coachId: string;
	fecha: Date;
	areaConocimiento: string;
	descriptor: string;
	tipoPregunta: string;
	pregunta: string;
	opciones: Opcion[];
}
