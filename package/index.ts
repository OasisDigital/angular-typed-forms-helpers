import { FormArray, FormControl, FormGroup, AbstractControl } from '@angular/forms';

// Converts any general type (number, string, boolean, array, date, object, etc...)
// to a basic setup of the Angular reactive form system types
export type AngularForm<T> = T extends (infer ElementType)[]
  ? FormArray<AngularForm<ElementType>>
  : T extends Date
  ? FormControl<T | null>
  : T extends object
  ? FormGroup<{
      [Key in keyof T]: AngularForm<T[Key]>;
    }>
  : T extends boolean
  ? FormControl<boolean | null>
  : FormControl<T | null>;

export type NonNullableAngularForm<T> = T extends (infer ElementType)[]
  ? FormArray<NonNullableAngularForm<ElementType>>
  : T extends Date
  ? FormControl<T>
  : T extends object
  ? FormGroup<{
      [Key in keyof T]: NonNullableAngularForm<T[Key]>;
    }>
  : T extends boolean
  ? FormControl<boolean>
  : FormControl<T>;

// Helpful subtype that shallowly converts an object to a FormGroup.
// Each property on the object becomes a FormControl.
export type AngularFormGroupShallow<T extends object> = T extends any[] | Date
  ? never
  : FormGroup<{
      [Key in keyof T]: FormControl<T[Key] | null>;
    }>;

export type NonNullableAngularFormGroupShallow<T extends object> = T extends any[] | Date
  ? never
  : FormGroup<{
      [Key in keyof T]: FormControl<T[Key]>;
    }>;

// Helpful subtype that deeply converts an object over to Angular's Typed Forms system.
// Based on the above larger AngularForm type.
export type AngularFormGroup<T extends object> = T extends any[] | Date
  ? never
  : FormGroup<{
      [Key in keyof T]: AngularForm<T[Key]>;
    }>;
export type NonNullableAngularFormGroup<T extends object> = T extends any[] | Date
  ? never
  : FormGroup<{
      [Key in keyof T]: NonNullableAngularForm<T[Key]>;
    }>;

// Helpful subtype that shallowly converts an array to a FormArray.
// The subtype of the array becomes a FormControl subtype for the FormArray.
export type AngularFormArrayShallow<T extends any[]> = T extends (infer ElementType)[]
  ? FormArray<FormControl<ElementType | null>>
  : never;

export type NonNullableAngularFormArrayShallow<T extends any[]> = T extends (infer ElementType)[]
  ? FormArray<FormControl<ElementType>>
  : never;

// Helpful subtype that deeply converts an array over to Angular's Typed Forms system.
// Based on the above larger AngularForm type.
export type AngularFormArray<T extends any[]> = T extends (infer ElementType)[]
  ? FormArray<AngularForm<ElementType>>
  : never;

export type NonNullableAngularFormArray<T extends any[]> = T extends (infer ElementType)[]
  ? FormArray<NonNullableAngularForm<ElementType>>
  : never;

// Converts any type from Angular's typed reactive form system to a
// general type (number, string, boolean, array, date, object, etc...)
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
// general type (number, string, boolean, array, date, object, etc...)
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
