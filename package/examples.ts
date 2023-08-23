import {
  AngularForm,
  AngularFormArray,
  AngularFormArrayShallow,
  AngularFormGroup,
  AngularFormGroupShallow,
  AngularFormRawValue,
  AngularFormValue,
} from '.';

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

export interface Environment {
  name: string;
  type: string;
  zones: Zone[];
}

type AnimalForm = AngularForm<Animal>;
type ZoneForm = AngularForm<Zone>;
type EnvironmentForm = AngularForm<Environment>;

type ZonesFormArrayShallow = AngularFormArrayShallow<Zone[]>;
type ZonesFormArray = AngularFormArray<Zone[]>;
type ZoneFormGroupShallow = AngularFormGroupShallow<Zone>;
type ZoneFormGroupDeep = AngularFormGroup<Zone>;

type EnvironmentValue = AngularFormValue<EnvironmentForm>;
type EnvironmentRawValue = AngularFormRawValue<EnvironmentForm>;
