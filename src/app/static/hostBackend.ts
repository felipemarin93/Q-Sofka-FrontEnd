import { environment } from '../../environments/environment';
export class PathRest {
    static readonly getApiAreaConocimiento = environment.HostBackend + 'area/conocimiento';
    static readonly getApiPregunta = environment.HostBackend + 'pregunta';
    static readonly getApiUsuario = environment.HostBackend + 'usuario';
}