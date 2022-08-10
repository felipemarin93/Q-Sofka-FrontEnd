import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import Swal from 'sweetalert2';
import { Opcion } from 'src/app/models/opcion';
import { Pregunta } from 'src/app/models/pregunta';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntasService } from 'src/app/services/preguntas.service';

@Component({
  selector: 'app-creacion-preguntas-component',
  templateUrl: './creacion-preguntas-component.component.html',
  styleUrls: ['./creacion-preguntas-component.component.css'],
})
export class CreacionPreguntasComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('exampleModal') modal: ElementRef;
  title = 'Agregar Pregunta';
  tiposPregunta: string[] = [];
  areasConocimiento: string[] = [];
  descriptores: string[] = [];
  opcionesTipoPregunta: string[] = [
    'Opción múltiple',
    'Única opción',
    'Verdadero o falso',
  ];
  opcionesAreaConocimiento: AreaConocimiento[] = [];
  opcionesDescriptores?: Descriptor[];
  opciones: Opcion[] = [];
  opcion: string = '';
  tipoPregunta?: string;
  areaConocimientoNombre: string = '';
  areaConocimiento: AreaConocimiento;
  descriptor: string = 'Seleccione una opcion';
  pregunta?: string;
  preguntaForm: FormGroup;
  tieneOpcionesMultiples: boolean | null = null;
  botonAgregarOpcionDisable: boolean = true;
  checkboxEscorrectoDisable: boolean = true;
  requerimientosPregunta: ValidationErrors[] = [];
  opcionCorrecta: boolean = false;
  areaConocimientoOpcion: string = '';

  //id traido por la url
  idPregunta: string;
  //validar si se guarda o se actualiza
  actualizar: boolean = false;
  //pregunta traida con id
  preguntaAModificar: Pregunta;

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
    private servicioHttpAreaConocimiento: HttpServiceAreaConocimientoService,
    private activateRoute: ActivatedRoute,
    private preguntasService: PreguntasService
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
        ],
      ],
      opcionForm: [''],
      opcionCorrectaForm: [''],
    });
    this.obtenerAreasConocimiento();
  }

  ngOnInit(): void {
    if (this.cookieService.get('checkRespuesta') !== '') {
      this.checkboxEscorrectoDisable = !Boolean(this.cookieService.get('checkRespuesta'));
    }
    if (this.cookieService.get('tipoPreguntaForm') !== '') {
      this.tipoPregunta = this.cookieService.get('tipoPreguntaForm');
    }
    if (this.cookieService.get('areaConocimientoForm') !== '') {
      this.areaConocimientoOpcion = this.cookieService.get('areaConocimientoForm');
    }
    if (this.cookieService.get('descriptorForm') !== '') {
      this.descriptor = this.cookieService.get('descriptorForm');
    }
    if (JSON.parse(localStorage.getItem('opciones')!)) {
      this.opciones = JSON.parse(localStorage.getItem('opciones')!);
    }
    this.pregunta = this.cookieService.get('preguntaFormulario');
    this.traerInformacionActualizar();


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.activateRoute.snapshot.params['id']) this.llenarFormularioActualizar()
      console.log("ejecutarafterChecked");
    })
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
        areas.forEach(element => {
          this.opcionesAreaConocimiento.push(element)
        })
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

  obtenerDescriptor(areaConocimiento: AreaConocimiento): void {
    let idArea = this.preguntaForm.value.areaConocimientoForm.id;
    this.opcionesAreaConocimiento.forEach(area => {
      if (idArea === area.id) this.opcionesDescriptores = area.descriptores
    })
  }

  // -------------------------------------------------------------------------------
  // Pregunta
  // -------------------------------------------------------------------------------

  traerInformacionActualizar() {
    this.idPregunta = this.activateRoute.snapshot.params['id'];
    if (this.idPregunta) {
      this.actualizar = true
      this.preguntasService.getPreguntaId(this.idPregunta).subscribe((data) => {
        this.preguntaAModificar = data;
      });
    }
  }

  llenarFormularioActualizar() {
    console.log(this.preguntaAModificar);
    this.preguntaForm.controls['tipoPreguntaForm'].setValue(this.preguntaAModificar.tipoPregunta)
    this.preguntaForm.controls['areaConocimientoForm'].setValue(this.preguntaAModificar.areaConocimiento)
    this.preguntaForm.controls['descriptorForm'].setValue(this.preguntaAModificar.descriptor)
    this.preguntaForm.controls['preguntaFormulario'].setValue(this.preguntaAModificar.pregunta)
    this.opciones = this.preguntaAModificar.opciones
  }

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
    if (!this.tieneOpcionesMultiples) {
      this.preguntaForm.controls['preguntaFormulario'].setValidators([
        Validators.required,
        this.validarPreguntaVerdaderoFalso,
      ]);
    } else {
      this.preguntaForm.controls['preguntaFormulario'].setValidators([
        Validators.required,
        this.validarPregunta,
        this.validarPreguntaCaracterFinal,
      ]);
    }
  }

  // -------------------------------------------------------------------------------
  // Opcion
  // -------------------------------------------------------------------------------
  persistirOpcion(namekey: string) {
    let value = '';
    if (namekey === 'areaConocimientoForm')
      value = this.preguntaForm.value.areaConocimientoForm;
    if (namekey === 'tipoPreguntaForm')
      value = this.preguntaForm.value.tipoPreguntaForm;
    if (namekey === 'descriptorForm')
      value = this.preguntaForm.value.descriptorForm;
    if (namekey === 'preguntaFormulario')
      value = this.preguntaForm.value.preguntaFormulario;

    this.cookieService.set(
      namekey,
      value,
      this.obtenerLimiteCookie(new Date())
    );
  }

  obtenerLimiteCookie(fecha: Date): Date {
    return new Date(Date.parse(fecha.toString()) + 1200000);
  }

  validarOpcion(): void {
    if (this.preguntaForm.value.opcionForm) {
      this.botonAgregarOpcionDisable = false;
    } else {
      this.botonAgregarOpcionDisable = true;
    }
    this.validarEsEditar();
  }

  validarEsEditar(): void {
    if (this.cookieService.get('opcionEditar')) {
      this.botonAgregarOpcionDisable = false;
    } else {
      if (this.tipoPregunta !== 'Verdadero o falso') {
        this.validarPreguntaOpcionMultiple();
      } else {
        this.validarPreguntaVF();
      }
    }
  }

  validarPreguntaOpcionMultiple(): void {
    if (this.opciones.length >= 4) this.botonAgregarOpcionDisable = true;
  }

  validarPreguntaVF(): void {
    if (this.opciones.length >= 2) this.botonAgregarOpcionDisable = true;
  }

  obtenerCheck() {
    this.opcionCorrecta = this.preguntaForm.value.opcionCorrectaForm;
  }

  agregarEditarOpcion() {
    console.log(this.tipoPregunta);
    let indice = this.cookieService.get('opcionEditar');
    if (indice) {
      let opcionEditar = {
        nombre: this.opcion,
        esCorrecto: this.opcionCorrecta,
      };
      this.opciones[parseInt(indice!)] = opcionEditar;
      localStorage.setItem('opciones', JSON.stringify(this.opciones));
      this.opcion = '';
    } else {
      let opcionEnviar = {
        nombre: this.opcion,
        esCorrecto: this.opcionCorrecta,
      };
      this.opciones.push(opcionEnviar);
      localStorage.setItem('opciones', JSON.stringify(this.opciones));
      this.opcion = '';
    }
    this.cookieService.delete('opcionEditar');
    if (this.tipoPregunta === 'Única opción' && this.opcionCorrecta) {
      this.cookieService.set('checkRespuesta', 'false', this.obtenerLimiteCookie(new Date))
      this.checkboxEscorrectoDisable = false
      this.opcionCorrecta = false
    }
  }

  eliminarOpcion(opcion: string, esCorrecta: boolean) {
    Swal.fire({
      text: '¿Esta seguro de eliminar La Opcion ?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#0d6efd',
      icon: 'question',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        if (esCorrecta) {
          this.checkboxEscorrectoDisable = true
          this.cookieService.delete('checkRespuesta')
        }
        let item = this.opciones.findIndex(
          (element) => element.nombre == opcion
        );
        this.opciones.splice(item, 1);
        localStorage.setItem('opciones', JSON.stringify(this.opciones));
        console.log(item);
      }
    });
  }

  editarOpcion(indice: number) {
    this.opcion = this.opciones[indice].nombre;
    this.opcionCorrecta = this.opciones[indice].esCorrecto;
    this.preguntaForm.controls['opcionCorrectaForm'].setValue(
      this.opcionCorrecta
    );
    this.cookieService.set(
      'opcionEditar',
      indice.toString(),
      this.obtenerLimiteCookie(new Date())
    );
  }

  // -------------------------------------------------------------------------------
  // Botones guardar, validarGuardarPregunta y Regresar
  // -------------------------------------------------------------------------------
  validarGuardarPregunta(opciones: number, tipoPregunta: string) {
    let mensajeMultipleUnicaOpcion;
    let mensajeVerdaderoFalso;
    mensajeMultipleUnicaOpcion =
      (tipoPregunta == 'Opción múltiple' || tipoPregunta == 'Única opción') &&
        opciones == 4
        ? true
        : false;
    mensajeVerdaderoFalso =
      tipoPregunta == 'Verdadero o falso' && opciones == 2 ? true : false;
    return tipoPregunta === 'Verdadero o falso'
      ? mensajeVerdaderoFalso
      : mensajeMultipleUnicaOpcion;
  }

  guardarPregunta() {
    const tipoPreguntaValue = this.preguntaForm.value.tipoPreguntaForm;
    const areaConocimientoValue = this.preguntaForm.value.areaConocimientoForm;
    const descriptorValue = this.preguntaForm.value.descriptorForm;
    const preguntaFormularioValue = this.preguntaForm.value.preguntaFormulario;
    let opciones = this.opciones.length;
    let mensaje = this.validarGuardarPregunta(opciones, tipoPreguntaValue);
    if (mensaje) {
      Swal.fire({
        text: '¿Desea Guardar la pregunta?',
        confirmButtonText: 'Guardar Pregunta',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      });
    } else {
      Swal.fire({
        text: 'Ingrese las opciones correctamente',
        confirmButtonText: 'Salir',
        icon: 'error',
        confirmButtonColor: '#dc3545',
      });
    }
  }

  regresar() {
    console.log(this.preguntaForm);
    console.log('entra');
    Swal.fire({
      text: '¿Está seguro que quiere volver? Aún no ha finalizado/agregado su pregunta. SI/NO’',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#0d6efd',
      icon: 'question',
      confirmButtonColor: '#dc3545',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['coach-dashboard']);
      }
    });
  }
}

// --------------------------------------------------------------------------------
//   Ejemplo Alert con Sweetalert2
// --------------------------------------------------------------------------------
//   Swal.fire({
//     text: 'desde guardar pregunta es valido',
//     icon: 'success',
//     confirmButtonColor: '#3085d6',
//     cancelButtonColor: '#d33',
//     allowOutsideClick: false
//   }).then((result) => {
//     if (result.isConfirmed) {
//       console.log("hola");
//       Swal.fire({
//         text: 'desde guardar pregunta es valido',
//       })
//     }
//   });
