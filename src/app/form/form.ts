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

  constructor() {
    document.modelContext?.registerTool({
      name: 'fill-form',
      description: 'Fill this form!',
      inputSchema: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          city: { type: 'string' },
        },
      },
      execute: (result) => this.model.set(result as any),
    });
  }

  async fillForm(value: string) {
    const languageModel = await LanguageModel.create({
      initialPrompts: [{
        role: "system",
        content: `Extract the information to a JSON object of this shape: ${JSON.stringify(this.model())}`,
      }],
    });
    const result = await languageModel.prompt(value, {
      responseConstraint: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Try to determine the name of the human! No company please.' },
          city: { type: 'string' },
        },
      },
    });
    console.log(result);
    this.model.set(JSON.parse(result));
  }

  async paste() {
    const content = await navigator.clipboard.readText();
    await this.fillForm(content);
  }
}
