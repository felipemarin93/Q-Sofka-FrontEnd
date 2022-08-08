import { Opcion } from "./opcion";

export interface Pregunta{
	id?: string;
	coachId: string;
	fecha: Date;
	areaConocimientoId: string;
	descriptorId: string;
	tipoPregunta: string;
	pregunta: string;
	opciones: Opcion[];
}
