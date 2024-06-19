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
import { EscenaryService } from '../../services/escenary.service';
import { Escenary, EscenaryCreate } from '../interface/escenary.interface';
@Component({
  selector: 'app-add-edit-escenary',
  templateUrl: './add-edit-escenary.component.html',
  styleUrls: ['./add-edit-escenary.component.css']
})
export class AddEditEscenaryComponent implements OnInit {

  constructor(private cdr: ChangeDetectorRef, private fb: NonNullableFormBuilder,private readonly escenaryService:EscenaryService, private route: ActivatedRoute, private router: Router,private notification: NzNotificationService) {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      user: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      });
  }
  validateForm: FormGroup<{
    name:FormControl<string>
    description:FormControl<string>
    user:FormControl<number | any>
  }>;

  
  isEditing: boolean = false;

  ngOnInit(): void {
    const escenaryId = this.route.snapshot.paramMap.get('id');
    if (escenaryId) {
      this.isEditing = true;
      this.escenaryService.getOne(Number(escenaryId)).subscribe((escenary: Escenary) => {
        this.createForm(escenary);
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
      return this.escenaryService.get().pipe(
        map(escenary => {
          const isUnique = !escenary.some(escenarys => escenarys.id === control.value && (!this.isEditing || escenarys.id.toString() !== this.route.snapshot.paramMap.get('id')));
          return isUnique ? null : { 'duplicated': true }; // Asigna el error 'duplicated' si el código no es único
        }),
        catchError(() => of({ 'error': true })) // Maneja errores potenciales en la obtención de exámenes
      );
    };
  }




  createForm(escenarys?: Escenary): void {
    this.validateForm = this.fb.group({
      description: [escenarys ? escenarys.description : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
        this.notOnlyWhitespaceOrDotsValidator ,
        this.notOnlyWhitespaceValidator
      ]],
      
      name: [escenarys ? escenarys.name : '', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ .]+$'),
      ]],
      user: [escenarys ? escenarys.user: '', [
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


  submitForm(redirectToescenaryList: boolean = false): void {
    if (this.validateForm.valid) {
      const formValue = this.validateForm.value;
      let escenarys: Partial<Escenary> = {
        description: formValue.description|| '',
        name: formValue.name|| '',
        user: formValue.user|| null,
      };

      const escenaryId = this.route.snapshot.paramMap.get('id');
      if (this.isEditing && escenaryId) {
        escenarys = { ...escenarys, id: Number(escenaryId) };
        this.escenaryService.update(Number(escenaryId),escenarys).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El escenary se ha actualizado correctamente');

            // Obtener los datos actualizados del examen desde el backend
            this.escenaryService.getOne(Number(escenaryId)).subscribe({
              next: (updatedescenary: Escenary) => {
                console.log(updatedescenary);
                this.createForm(updatedescenary);
                this.afterSubmit(redirectToescenaryList);

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

        this.escenaryService.create(escenarys as EscenaryCreate).subscribe({
          next: () => {
            this.notification.success('Éxito', 'El escenary se ha agregado correctamente');
            this.afterSubmit(redirectToescenaryList);
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
      this.router.navigate(['/escenary/list-escenary']);
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

