import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AreaConocimiento } from 'src/app/models/areaConocimiento';
import { HttpServiceAreaConocimientoService } from 'src/app/services/http-service-area-conocimiento.service';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Descriptor } from 'src/app/models/descriptor';

@Component({
  selector: 'app-creacion-preguntas-component',
  templateUrl: './creacion-preguntas-component.component.html',
  styleUrls: ['./creacion-preguntas-component.component.css'],
})
export class CreacionPreguntasComponentComponent implements OnInit {
  title = 'Agregar Pregunta';
  tiposPregunta: string[] = [];
  areasConocimiento: string[] = [];
  descriptores: string[] = [];
  opcionesTipoPregunta: string[] = [
    'Opción múltiple',
    'Única opción',
    'Verdadero o falso',
  ];
  opcionesAreaConocimiento?: AreaConocimiento[];
  opcionesDescriptores?: Descriptor[];
  opciones: string[] = [];
  opcion: string = '';
  tipoPregunta?: string;
  areaConocimiento: string = 'Seleccione una opcion';
  descriptor: string = 'Seleccione una opcion';
  pregunta?: string;
  preguntaForm: FormGroup;
  tieneOpcionesMultiples: boolean | null = null;
  botonAgregarOpcionDisable: boolean = false;
  requerimientosPregunta: ValidationErrors[] = [];

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private servicioHttpAreaConocimiento: HttpServiceAreaConocimientoService
  ) {
    this.preguntaForm = this.fb.group({
      tipoPreguntaForm: ['', Validators.required],
      areaConocimientoForm: ['', Validators.required],
      descriptorForm: ['', Validators.required],
      preguntaFormulario: [
        '',
        [
          Validators.required,
          this.validarPregunta,
          this.validarPreguntaCaracterFinal,
          this.validarPreguntaVerdaderoFalso,
        ],
      ],
      opcionForm: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerAreasConocimiento();
    if (this.cookieService.get('tipoPregunta') !== '') {
      this.tipoPregunta = this.cookieService.get('tipoPregunta');
    }
    if (this.cookieService.get('areaConocimiento') !== '') {
      this.areaConocimiento = this.cookieService.get('areaConocimiento');
    }
    if (this.cookieService.get('descriptor') !== '') {
      this.descriptor = this.cookieService.get('descriptor');
    }
    if (JSON.parse(localStorage.getItem('opciones')!)) {
      this.opciones = JSON.parse(localStorage.getItem('opciones')!);
    }
    this.pregunta = this.cookieService.get('pregunta');
  }

  // -------------------------------------------------------------------------------
  // Tipo de Pregunta
  // -------------------------------------------------------------------------------

  get tipopreguntaNoValida() {
    return (
      this.preguntaForm.get('tipoPreguntaForm')?.hasError('required') &&
      this.preguntaForm.get('tipoPreguntaForm')?.touched
    );
  }

  // -------------------------------------------------------------------------------
  // Area de Conocimiento
  // -------------------------------------------------------------------------------

  get areaConocimientoNoValida() {
    return (
      this.preguntaForm.get('areaConocimientoForm')?.hasError('required') &&
      this.preguntaForm.get('areaConocimientoForm')?.touched
    );
  }

  obtenerAreasConocimiento(): void {
    this.servicioHttpAreaConocimiento
      .listarAreaConocimiento()
      .subscribe((areas) => {
        this.opcionesAreaConocimiento = areas;
      });
  }

  obtenerAreaConocimientoForm(idAreaconocimiento: string) {
    console.log(idAreaconocimiento);
  }

  // -------------------------------------------------------------------------------
  // Descriptor
  // -------------------------------------------------------------------------------

  get descriptorNoValida() {
    return (
      this.preguntaForm.get('descriptorForm')?.hasError('required') &&
      this.preguntaForm.get('descriptorForm')?.touched
    );
  }

  obtenerDescriptor(id: string): void {
    this.servicioHttpAreaConocimiento
      .listarDescriptor(id)
      .subscribe((descriptores) => {
        this.opcionesDescriptores = descriptores;
      });
  }

  // -------------------------------------------------------------------------------
  // Pregunta
  // -------------------------------------------------------------------------------

  get preguntaFormNoValida() {
    return (
      this.preguntaForm.get('preguntaFormulario')?.hasError('required') &&
      this.preguntaForm.get('preguntaFormulario')?.touched
    );
  }

  get verdaderoFalsoValido() {
    return (
      this.preguntaForm.get('preguntaFormulario')?.errors?.[
        'validarPreguntaVerdaderoFalso'
      ] && this.preguntaForm.get('preguntaFormulario')?.touched
    );
  }

  mostrarRequerimientoPregunta(opcion: string): void {
    if (opcion === 'Verdadero o falso') {
      this.tieneOpcionesMultiples = false;
    } else {
      this.tieneOpcionesMultiples = true;
    }
    this.obtenerRequerimiento();
  }

  private validarPregunta(control: AbstractControl): ValidationErrors | null {
    let pregunta = control.value;
    if (
      !pregunta.startsWith('¿Qué') &&
      !pregunta.startsWith('¿Cómo') &&
      !pregunta.startsWith('¿Dónde') &&
      !pregunta.startsWith('¿Cuál') &&
      !pregunta.startsWith('¿Es')
    ) {
      return { validarPregunta: true };
    } else {
      return null;
    }
  }

  private validarPreguntaVerdaderoFalso(
    control: AbstractControl
  ): ValidationErrors | null {
    let pregunta = control.value;
    if (!pregunta.startsWith('Verdadero') && !pregunta.startsWith('Falso')) {
      return { validarPreguntaVerdaderoFalso: true };
    } else {
      return null;
    }
  }

  private validarPreguntaCaracterFinal(
    control: AbstractControl
  ): ValidationErrors | null {
    let pregunta = control.value;
    if (!pregunta.endsWith('?')) {
      return { validarPreguntaCaracterFinal: true };
    } else {
      return null;
    }
  }

  obtenerRequerimiento(): void {
    if (this.tieneOpcionesMultiples) {
      this.requerimientosPregunta = [
        Validators.required,
        this.validarPregunta,
        this.validarPreguntaCaracterFinal,
      ];
    } else {
      this.requerimientosPregunta = [
        Validators.required,
        this.validarPreguntaVerdaderoFalso,
      ];
    }
    // this.preguntaForm.
  }

  // -------------------------------------------------------------------------------
  // Opcion
  // -------------------------------------------------------------------------------

  persistirOpcion(namekey: string, value: string) {
    this.cookieService.set(
      namekey,
      value,
      this.obtenerLimiteCookie(new Date())
    );
  }

  obtenerLimiteCookie(fecha: Date): Date {
    return new Date(Date.parse(fecha.toString()) + 1200000);
  }

  agregarEditarOpcion() {
    let indice = this.cookieService.get('opcionEditar');
    if (indice) {
      this.opciones[parseInt(indice!)] = this.opcion;
      localStorage.setItem('opciones', JSON.stringify(this.opciones));
      this.opcion = '';
    } else {
      this.opciones.push(this.opcion!);
      localStorage.setItem('opciones', JSON.stringify(this.opciones));
      this.opcion = '';
    }
    this.cookieService.delete('opcionEditar');
  }

  eliminarOpcion(opcion: string) {
    let item = this.opciones.findIndex((element) => element == opcion);
    this.opciones.splice(item, 1);
    localStorage.setItem('opciones', JSON.stringify(this.opciones));
    console.log(item);
  }

  editarOpcion(indice: number) {
    this.opcion = this.opciones[indice];
    this.cookieService.set(
      'opcionEditar',
      indice.toString(),
      this.obtenerLimiteCookie(new Date())
    );
  }

  // -------------------------------------------------------------------------------
  // Botones guardar y Regresar
  // -------------------------------------------------------------------------------
  validarGuardarPregunta(opciones: number) {
    if (opciones < 4) {
      alert('para guardar la pregunta se necesita cuatro opciones');
    }
  }

  guardarPregunta() {
    //this.cookieService.deleteAll('/');
    //localStorage.removeItem('opciones');
    const tipoPreguntaValue = this.preguntaForm.value.tipoPreguntaForm;
    const areaConocimientoValue = this.preguntaForm.value.areaConocimientoForm;
    const descriptorValue = this.preguntaForm.value.descriptorForm;
    const preguntaFormularioValue = this.preguntaForm.value.preguntaFormulario;
    let opciones = this.opciones.length;
    console.log(opciones);
    if (
      tipoPreguntaValue == 'Opción múltiple' ||
      tipoPreguntaValue == 'Única opción'
    ) {
      this.validarGuardarPregunta(opciones);
    }
  }
}
