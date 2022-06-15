import { FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';

// Converts any general type (number, string, boolean, object, array, etc...)
// to a basic setup of the Angular reactive form system types
export type AngularForm<T> = T extends (infer ElementType)[]
  ? FormArray<AngularForm<ElementType>>
  : T extends object
  ? FormGroup<{
      [Key in keyof T]: AngularForm<T[Key]>;
    }>
  : FormControl<T>;

// Helpful sub-type for the above `AngularForm` regarding object -> FormGroup.
// This is case you need to mix & match types in a form.
export type AngularFormGroup<T extends object> = T extends any[]
  ? never
  : FormGroup<{
      [Key in keyof T]: AngularForm<T[Key]>;
    }>;

// Helpful sub-type for the above `AngularForm` regarding array -> FormArray.
// This is case you need to mix & match types in a form.
export type AngularFormArray<T extends any[]> = T extends (infer ElementType)[]
  ? FormArray<AngularForm<ElementType>>
  : never;

// Converts any type from Angular's typed reactive form system to a
// general type (number, string, boolean, object, array, etc...)
// This will correctly use Partial for any objects
export type AngularFormValue<T> = T extends FormArray<infer FA>
  ? AngularFormValue<FA>[]
  : T extends FormGroup<infer FG>
  ? Partial<{
      [Key in keyof FG]: AngularFormValue<FG[Key]>;
    }>
  : T extends FormControl<infer FC>
  ? FC
  : T extends AbstractControl<infer AC>
  ? AC
  : never;

// Converts any type from Angular's typed reactive form system to a
// general type (number, string, boolean, object, array, etc...)
// Does not use Partial for objects
export type AngularFormRawValue<T> = T extends FormArray<infer FA>
  ? AngularFormRawValue<FA>[]
  : T extends FormGroup<infer FG>
  ? {
      [Key in keyof FG]: AngularFormRawValue<FG[Key]>;
    }
  : T extends FormControl<infer FC>
  ? FC
  : T extends AbstractControl<infer AC>
  ? AC
  : never;
