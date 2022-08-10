import { Opcion } from "./opcion";

export interface Pregunta {
	id: string | null;
	coachId: string;
	fechaActualizacion: any;
	areaConocimiento: string;
	descriptor: string;
	tipoPregunta: string;
	pregunta: string;
	opciones: Opcion[];
}
