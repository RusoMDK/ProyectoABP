import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {SensorService } from '../../services/sensor.service';
import {  Sensor, SensorCreate } from '../interface/sensor.interface';
@Component({
  selector: 'app-add-edit-sensor',
  templateUrl: './add-edit-sensor.component.html',
  styleUrls: ['./add-edit-sensor.component.css']
})
export class AddEditSensorComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private fb: NonNullableFormBuilder,private readonly sensorService:SensorService, private route: ActivatedRoute, private router: Router,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      escenary: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      device: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }
  validateForm: FormGroup<{
    type:FormControl<string>
    description:FormControl<string>
    escenary:FormControl<number | any>
    device:FormControl<number | any>
  }>;

  
  isEditing: boolean = false;

  ngOnInit(): void {
    const sensorId = this.route.snapshot.paramMap.get('id');
    if (sensorId) {
      this.isEditing = true;
      this.sensorService.getOne(Number(sensorId)).subscribe((sensor: Sensor) => {
        this.createForm(sensor);
      });
    } else {
      this.createForm();
    }

  }

  // Validar codigo unico
  uniqueCodeValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null); // Si no hay entrada, no se verifica la unicidad
      }
      return this.sensorService.get().pipe(
        map(sensor => {
          const isUnique = !sensor.some(sensors => sensors.id === control.value && (!this.isEditing || sensors.id.toString() !== this.route.snapshot.paramMap.get('id')));
          return isUnique ? null : { 'duplicated': true }; // Asigna el error 'duplicated' si el código no es único
        }),
        catchError(() => of({ 'error': true })) // Maneja errores potenciales en la obtención de exámenes
      );
    };
  }




  createForm(sensors?: Sensor): void {
    this.validateForm = this.fb.group({
      description: [sensors ? sensors.description : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
        this.notOnlyWhitespaceOrDotsValidator ,
        this.notOnlyWhitespaceValidator
      ]],
      
      type: [sensors ? sensors.type : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      escenary: [sensors ? sensors.escenary: '', [
        Validators.required,
      ]],
      device: [sensors ? sensors.device: '', [
        Validators.required,
      ]],
    });
  }

  // Validador personalizado para verificar que el valor no sea solo espacios o puntos
  notOnlyWhitespaceOrDotsValidator(control: AbstractControl): ValidationErrors | null {
   const value = (control.value || '').trim();
   const isInvalid = value.length === 0 || /^[. ]+$/.test(value);
   return isInvalid ? { 'whitespace': true } : null;
 }
  // Validador personalizado para verificar que el valor no sea solo espacios
  notOnlyWhitespaceValidator(control: AbstractControl): ValidationErrors | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


  submitForm(redirectToSensorList: boolean = false): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      let sensors: Partial<Sensor> = {
        description: formValue.description|| '',
        type: formValue.type|| '',
        device: formValue.device|| '',
        escenary: formValue.escenary|| '',
       
      };

      const sensorId = this.route.snapshot.paramMap.get('id');
      if (this.isEditing && sensorId) {
        sensors = { ...sensors, id: Number(sensorId) };
        this.sensorService.update(Number(sensorId),sensors).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Sensor se ha actualizado correctamente');

            // Obtener los datos actualizados del examen desde el backend
            this.sensorService.getOne(Number(sensorId)).subscribe({
              next: (updatedSensor: Sensor) => {
                console.log(updatedSensor);
                this.createForm(updatedSensor);
                this.afterSubmit(redirectToSensorList);

              },
              error: (error) => {
                console.error(error);
                // Manejo del error al obtener los datos actualizados
              }
            });
          },
          error: (error) => {
            console.error(error);
            // Manejo del error
          }
        });
      } else {

        this.sensorService.create(sensors as SensorCreate).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Sensor se ha agregado correctamente');
            this.afterSubmit(redirectToSensorList);
          },
          error: (error) => {
            console.error(error);
            // Manejo del error
          }
        });
      }
    } else if (this.validateForm.invalid) {
      this.notification.error('Error', 'Debes rellenar correctamente todos los campos del formulario.');
      this.validateForm.markAllAsTouched();
      this.cdr.detectChanges(); // Forzar la detección de cambios
      return
    }
  }



  // Método para acciones después de enviar el formulario
  private afterSubmit(redirectToDevicesList: boolean): void {
    this.validateForm.reset();
    if (redirectToDevicesList) {
      this.router.navigate(['/sensors/list-sensors']);
    }
  }



  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  confirmValidator: ValidatorFn = (control: AbstractControl) => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (isNaN(control.value)) {
      return { error: true, pattern: true }; // Retorna un error si no es un número
    } else if (control.value !== this.validateForm.controls.type.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


}

