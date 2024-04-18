import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  AngularForm,
  AngularFormArray,
  AngularFormArrayShallow,
  AngularFormGroup,
  AngularFormGroupShallow,
  AngularFormRawValue,
  AngularFormValue,
  NonNullableAngularForm,
  NonNullableAngularFormArray,
  NonNullableAngularFormArrayShallow,
  NonNullableAngularFormGroup,
  NonNullableAngularFormGroupShallow,
} from './index';

export interface Animal {
  name: string;
  species: string;
  lifeStage: string;
  birthDate: Date;
  alive: boolean;
}

export interface Zone {
  name: string;
  maxCapacity: number;
  animals: Animal[];
}

export interface Environment {
  name: string;
  type: string;
  zones: Zone[];
}

type AnimalForm = AngularForm<Animal>;
type NonNullableAnimalForm = NonNullableAngularForm<Animal>;
type ZoneForm = AngularForm<Zone>;
type NonNullableZoneForm = NonNullableAngularForm<Zone>;
type EnvironmentForm = AngularForm<Environment>;
type NonNullableEnvironmentForm = NonNullableAngularForm<Environment>;

type ZonesFormArrayShallow = AngularFormArrayShallow<Zone[]>;
type ZonesFormArray = AngularFormArray<Zone[]>;
type ZoneFormGroupShallow = AngularFormGroupShallow<Zone>;
type ZoneFormGroupDeep = AngularFormGroup<Zone>;

type EnvironmentValue = AngularFormValue<EnvironmentForm>;
type EnvironmentRawValue = AngularFormRawValue<EnvironmentForm>;
type NonNullableEnvironmentValue = AngularFormValue<NonNullableEnvironmentForm>;
type NonNullableEnvironmentRawValue = AngularFormRawValue<NonNullableEnvironmentForm>;

const animalForm: AnimalForm = new FormGroup({
  name: new FormControl(''),
  species: new FormControl(''),
  lifeStage: new FormControl(''),
  birthDate: new FormControl(new Date('01 Jan 1994')),
  alive: new FormControl(true),
});

const nonNullableAnimalForm: NonNullableAnimalForm = new FormGroup({
  name: new FormControl('', { nonNullable: true }),
  species: new FormControl('', { nonNullable: true }),
  lifeStage: new FormControl('', { nonNullable: true }),
  birthDate: new FormControl(new Date('01 Jan 1994'), { nonNullable: true }),
  alive: new FormControl(true, { nonNullable: true }),
});

const zoneForm: ZoneForm = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormArray<AnimalForm>([]),
});

const zoneFormShallow: ZoneFormGroupShallow = new FormGroup({
  name: new FormControl(''),
  maxCapacity: new FormControl(10),
  animals: new FormControl<Animal[]>([]),
});
