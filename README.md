# Angular Typed Forms Helpers

This package includes helper types for when you are dealing with Angular's typed reactive forms
system. These types allow for translating raw typescript interfaces/types into the Reactive Forms
Types and back into raw typescript interfaces/types for the value.

## Installation

### npm

`npm install --save-dev @oasisdigital/angular-typed-forms-helpers`

### yarn

`yarn add --dev @oasisdigital/angular-typed-forms-helpers`

Then you can simply import the helper interfaces from `angular-typed-forms-helpers`.

## [Stackblitz Demo](https://stackblitz.com/edit/angular-typed-forms-helpers-demo?file=src%2Fapp%2Fapp.component.ts)

## `AngularForm` Interface

This interface allows for translating an object or general TS type/interface into one of the 3 main
Angular Reactive Forms types (FormControl, FormGroup, FormArray).

```ts
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AngularForm } from 'angular-typed-forms-helpers';

export interface Animal {
  name: string;
  species: string;
  lifeStage: string;
}

export interface Zone {
  name: string;
  maxCapacity: number;
  animals: Animal[];
}

type AnimalForm = AngularForm<Animal>;
type ZoneForm = AngularForm<Zone>;

const animalForm: AnimalForm = new FormGroup({
  name: new FormControl(''),
  species: new FormControl(''),
  lifeStage: new FormControl(''),
});

const zoneForm: ZoneForm = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormArray<AnimalForm>([]),
});
```

It is important to note this interface only covers basic cases of form structures, it makes the
assumption that all objects are FormGroups and arrays are FormArrays. If you would like a
FormControl for one of your object/array types you will have to set it up manualy.

## `AngularFormGroup` Interface

This is a subset of the `AngularForm` interface translating only an object over to a `FormGroup`
setup. If you give an array type to this interface the return will be `never`. This is due to a
limitation of diffing arrays and objects in the generic extension type.

```ts
type AnimalForm = AngularFormGroup<Animal>;
const animalForm: AnimalForm = new FormGroup({
  name: new FormControl(''),
  species: new FormControl(''),
  lifeStage: new FormControl(''),
});
```

## `AngularFormArray` Interface

This is a subset of the `AngularForm` interface translating only an array over to a `FormArray`
setup.

```ts
type AnimalsForm = AngularFormArray<Animal[]>;
const animalForm: AnimalForm = new FormArray([
  {
    name: new FormControl(''),
    species: new FormControl(''),
    lifeStage: new FormControl(''),
  },
  {
    name: new FormControl(''),
    species: new FormControl(''),
    lifeStage: new FormControl(''),
  },
]);
```

## `AngularFormValue` Interface

This interface is used to translate the `.value` property type from a Angular Reactive Forms object.
This interface automatically accounts for the `Partial<>` nature of FormGroups since sub-controls
can be disabled. If you would like the whole form value regardless of disabled controls see
`AngularFormRawValue` below.

```ts
type AnimalForm = AngularForm<Animal>;

const animalForm: AnimalForm = new FormGroup({
  name: new FormControl(''),
  species: new FormControl(''),
  lifeStage: new FormControl({ value: '', disabled: true }),
});

const animalValue: AngularFormValue<AnimalForm> = animalForm.value;
/*
{
  name?: string;
  species?: string;
  lifeStage?: string;
}
*/
```

This interface also works for custom implementations of the `AbstractControl` class.

## `AngularFormRawValue` Interface

This interface is used to translate the `.getRawValue()` method return type from a Angular Reactive
Forms object. This will include all sub-controls regardless of their disabled state.

```ts
type AnimalForm = AngularForm<Animal>;

const animalForm: AnimalForm = new FormGroup({
  name: new FormControl(''),
  species: new FormControl(''),
  lifeStage: new FormControl({ value: '', disabled: true }),
});

const animalValue: AngularFormRawValue<AnimalForm> = animalForm.getRawValue();
/*
{
  name: string;
  species: string;
  lifeStage: string;
}
*/
```

This interface also works for custom implementations of the `AbstractControl` class.
