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
import { UserService } from '../../services/user.service';
import { User, UserCreate } from '../interface/user.interface';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private fb: NonNullableFormBuilder,private readonly userService:UserService, private route: ActivatedRoute, private router: Router,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      role: [null, [ Validators.pattern(/^[0-9]+$/)]],
      email:['',[Validators.required]],
      password:['',[Validators.required]],
      });
  }

  validateForm: FormGroup<{
    name:FormControl<string>
    username:FormControl<string>
    role:FormControl<number | any>
    email:FormControl<string>,
    password:FormControl<string>
  }>;

  
  isEditing: boolean = false;

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditing = true;
      this.userService.getOne(Number(userId)).subscribe((user: User) => {
        this.createForm(user);
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
      return this.userService.get().pipe(
        map(user => {
          const isUnique = !user.some(users => users.id === control.value && (!this.isEditing || users.id.toString() !== this.route.snapshot.paramMap.get('id')));
          return isUnique ? null : { 'duplicated': true }; // Asigna el error 'duplicated' si el código no es único
        }),
        catchError(() => of({ 'error': true })) // Maneja errores potenciales en la obtención de exámenes
      );
    };
  }

  createForm(users?: User): void {
    this.validateForm = this.fb.group({
      username: [users ? users.username : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      name: [users ? users.name : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      email: [users ? users.email : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      password: [users ? users.password : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      role: [users ? users.role: '', [
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

  submitForm(redirectTouserList: boolean = false): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      let users: Partial<User> = {
        username: formValue.username|| '',
        name: formValue.name|| '',
        role: formValue.role|| null,
        password: formValue.role|| '',
        email: formValue.email|| '',
      };

      const userId = this.route.snapshot.paramMap.get('id');
      if (this.isEditing && userId) {
        users = { ...users, id: Number(userId) };
        this.userService.update(Number(userId),users).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El user se ha actualizado correctamente');

            // Obtener los datos actualizados del examen desde el backend
            this.userService.getOne(Number(userId)).subscribe({
              next: (updateduser: User) => {
                console.log(updateduser);
                this.createForm(updateduser);
                this.afterSubmit(redirectTouserList);

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

        this.userService.create(users as UserCreate).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El user se ha agregado correctamente');
            this.afterSubmit(redirectTouserList);
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
      this.router.navigate(['/user/list-user']);
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

