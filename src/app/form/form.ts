import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'app-form',
  imports: [
    FormField,
  ],
  templateUrl: './form.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './form.scss'
})
export class Form {
  // LAB #13, #14, #15, #16, #17, #18
  protected readonly model = signal({
    name: '',
    city: '',
  });
  protected readonly form = form(this.model);

  async fillForm(value: string) {}
}
