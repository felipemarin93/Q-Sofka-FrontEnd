import { Opcion } from "./opcion";

export interface Pregunta {
	id?: string | null;
	coachId: string;
	fechaActualizacion: Date;
	pregunta: string;
	areaConocimiento: string;
	descriptor: string;
	tipoPregunta: string;
	opciones: Opcion[];
}
