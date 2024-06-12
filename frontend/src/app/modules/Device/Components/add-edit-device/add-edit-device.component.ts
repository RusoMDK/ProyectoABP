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
import { DeviceService } from '../../services/device.service';
import {  Devices, DevicesCreate } from '../interface/device.interface';
@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private fb: NonNullableFormBuilder,private readonly deviceService:DeviceService, private route: ActivatedRoute, private router: Router,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      user: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }
  validateForm: FormGroup<{
    name:FormControl<string>
    user:FormControl<number | any>
  }>;

  isEditing: boolean = false;

  ngOnInit(): void {
    const deviceId = this.route.snapshot.paramMap.get('id');
    if (deviceId) {
      this.isEditing = true;
      this.deviceService.getOne(Number(deviceId)).subscribe((device: Devices) => {
        this.createForm(device);
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
      return this.deviceService.get().pipe(
        map(device => {
          const isUnique = !device.some(devices => devices.id === control.value && (!this.isEditing || devices.id.toString() !== this.route.snapshot.paramMap.get('id')));
          return isUnique ? null : { 'duplicated': true }; // Asigna el error 'duplicated' si el código no es único
        }),
        catchError(() => of({ 'error': true })) // Maneja errores potenciales en la obtención de exámenes
      );
    };
  }




  createForm(devices?: Devices): void {
    this.validateForm = this.fb.group({
      name: [devices ? devices.name : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ 1234567890.]+$'),
        this.notOnlyWhitespaceOrDotsValidator ,
        this.notOnlyWhitespaceValidator
      ]],
      user: [devices ? devices?.user : null, [
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


  submitForm(redirectToDevicesList: boolean = false): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      let devices: Partial<Devices> = {
        name: formValue.name|| '',
        user: formValue.user || null
      };

      const deviceId = this.route.snapshot.paramMap.get('id');
      if (this.isEditing && deviceId) {
        devices = { ...devices, id: Number(deviceId) };
        this.deviceService.update(Number(deviceId),devices).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Dispositivo se ha actualizado correctamente');

            // Obtener los datos actualizados del examen desde el backend
            this.deviceService.getOne(Number(deviceId)).subscribe({
              next: (updatedDevices: Devices) => {
                console.log(updatedDevices);
                this.createForm(updatedDevices);
                this.afterSubmit(redirectToDevicesList);

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

        this.deviceService.create(devices as DevicesCreate).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Dispositivo se ha agregado correctamente');
            this.afterSubmit(redirectToDevicesList);
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
      this.router.navigate(['/devices-list-device']);
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
    } else if (control.value !== this.validateForm.controls.name.value) {
      return { confirm: true, error: true };
    }
    return {};
  };


}

