/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { NzModalRef } from 'ng-zorro-antd/modal';
import { AuthenticationService } from '../../../../core/_services/authentication.service';  // Importa el servicio de autenticación y la interfaz
import { User } from '../../../../core/_models/user'; // Importar la interfaz desde el archivo correcto



@Component({
  selector: 'app-add-edit-device',
  templateUrl: './add-edit-device.component.html',
  styleUrls: ['./add-edit-device.component.css']
})
export class AddEditDeviceComponent implements OnInit {

  currentUser: User | null = null;

  constructor(
    private cdr: ChangeDetectorRef, 
    private fb: NonNullableFormBuilder,
    private readonly deviceService:DeviceService, 
    private route: ActivatedRoute, 
    private router: Router,
    private notification: NzNotificationService,
    private modal: NzModalRef,  // Añadir esto
    private authService: AuthenticationService
  ) {
    
    this.currentUser = this.authService.currentUserValue;
  this.validateForm = this.fb.group({
    name: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ 1234567890.]+$')]],
    user: [this.currentUser ? this.currentUser.id : null]  // Configurado pero sin validaciones adicionales
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

  createForm(devices?: Devices): void {
    this.validateForm = this.fb.group({
      name: [devices ? devices.name : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ 1234567890.]+$'),
        this.notOnlyWhitespaceOrDotsValidator,
        this.notOnlyWhitespaceValidator
      ]],
      user: [devices ? devices.user : this.currentUser?.id]  // Rellenar automáticamente con el ID del usuario actual sin validaciones adicionales
    });
  }
  

  // Método para enviar el formulario
  submitForm(): void {
    if (this.validateForm.get('name')?.valid) {
      const formValue = this.validateForm.value;
      let devices: Partial<Devices> = {
        name: formValue.name || '',
        user: formValue.user  // Incluir el ID del usuario actual
      };
  
      const deviceId = this.route.snapshot.paramMap.get('id');
      if (this.isEditing && deviceId) {
        devices = { ...devices, id: Number(deviceId) };
        this.deviceService.update(Number(deviceId), devices).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Dispositivo se ha actualizado correctamente');
            this.closeModalAndRefresh();
          },
          error: (error) => {
            console.error(error);
            this.notification.error('Error', 'Ocurrió un error al actualizar el dispositivo.');
          }
        });
      } else {
        this.deviceService.create(devices as DevicesCreate).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El Dispositivo se ha agregado correctamente');
            this.closeModalAndRefresh();
          },
          error: (error) => {
            console.error(error);
            this.notification.error('Error', 'Ocurrió un error al agregar el dispositivo.');
          }
        });
      }
    } else {
      this.notification.error('Error', 'Debes rellenar correctamente el campo "Nombre del Modelo".');
      this.validateForm.get('name')?.markAsTouched();
      this.cdr.detectChanges();
    }
  }
  
  private closeModalAndRefresh(): void {
    this.modal.destroy();
    this.router.navigate(['/devices/list-device']).then(() => {
      window.location.reload();
    });
  }
  
  // Método para cerrar el modal
  handleCancel(): void {
    this.modal.destroy();
  }

  private afterSubmit(redirectToDevicesList: boolean): void {
    this.validateForm.reset();
    if (redirectToDevicesList) {
      this.router.navigate(['/devices/list-device']);
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

