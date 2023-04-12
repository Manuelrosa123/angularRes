import { Directive } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[fsEmailRepeated]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: EmailRepeatedDirective, multi: true },
  ],
})
export class EmailRepeatedDirective implements Validator{
  validate(group: FormGroup): ValidationErrors | null {
    if (group.value.email!=group.value.email2)
      return { emailRepeated: true };
    return null; // No errors
  }
}
