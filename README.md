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

### Versions

- <1.4.0 - Angular 14.x.x
- 1.4.0 - Angular 15.x.x
- 1.5.0 - Angular 16.x.x

## [Stackblitz Demo](https://stackblitz.com/edit/angular-typed-forms-helpers-demo?file=src%2Fapp%2Fapp.component.ts)

## `AngularForm` Interface

This interface allows for _deeply_ translating an object or general TS type/interface into one of
the 3 main Angular Reactive Forms types (FormControl, FormGroup, FormArray).

```ts
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { AngularForm } from '@oasisdigital/angular-typed-forms-helpers';

export interface Animal {
  name: string;
  species: string;
  lifeStage: string;
  birthDate: Date;
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
  birthDate: new FormControl(new Date('01 Jan 1994')),
});

const zoneForm: ZoneForm = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormArray<AnimalForm>([]),
});
```

It is important to note this interface only covers basic cases of form structures, it makes the
assumption that all objects are FormGroups and arrays are FormArrays. If you would like to convert
so deeply consider using the `AngularFormGroup` or `AngularFormArray` in the below sections.

## `AngularFormGroupShallow` Interface

This interface will do a _shallow_ conversion of an object over to the Angular Typed Forms system.
Where every property of the object becomes a FormControl.

```ts
type ZoneForm = AngularFormGroupShallow<Zone>;
const zoneForm: ZoneForm = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormControl<Animal[]>([]),
});
```

## `AngularFormGroup` Interface

This is a subset of the `AngularForm` interface that deeply converts an object over to the Angular
Typed Forms system. If you give an array type to this interface the return will be `never`. This is
due to a limitation of diffing arrays and objects in the generic extension type.

```ts
type ZoneForm = AngularFormGroup<Zone>;
const zoneForm: ZoneForm = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormArray<AnimalForm[]>([]),
});
```

## `AngularFormArrayShallow` Interface

This interface will do a _shallow_ conversion of an array over to the Angular Typed Forms system.
Where the Array subtype becomes a matching FormControl subtype for the FormArray.

```ts
type ZonesForm = AngularFormArrayShallow<Zone[]>;
const zonesForm: ZonesForm = new FormArray([
  {
    name: new FormControl(''),
    maxCapacity: new FormControl(10),
    animals: new FormControl<Animal[]>([]),
  },
  {
    name: new FormControl(''),
    maxCapacity: new FormControl(10),
    animals: new FormControl<Animal[]>([]),
  },
]);
```

## `AngularFormArray` Interface

This is a subset of the `AngularForm` interface that deeply converts an array over to the Angular
Typed Forms system.

```ts
type ZonesForm = AngularFormArray<Zone[]>;
const zonesForm: ZonesForm = new FormArray([
  {
    name: new FormControl(''),
    maxCapacity: new FormControl(10),
    animals: new FormArray<AnimalForm>([]),
  },
  {
    name: new FormControl(''),
    maxCapacity: new FormControl(10),
    animals: new FormArray<AnimalForm>([]),
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
  birthDate: new FormControl(new Date('01 Jan 1994')),
});

const animalValue: AngularFormValue<AnimalForm> = animalForm.value;
/*
{
  name?: string;
  species?: string;
  lifeStage?: string;
  birthDate?: Date;
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
  birthDate: new FormControl(new Date('01 Jan 1994')),
});

const animalValue: AngularFormRawValue<AnimalForm> = animalForm.getRawValue();
/*
{
  name: string;
  species: string;
  lifeStage: string;
  birthDate: Date;
}
*/
```

This interface also works for custom implementations of the `AbstractControl` class.
