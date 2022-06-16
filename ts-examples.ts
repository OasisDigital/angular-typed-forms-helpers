import { AngularForm, AngularFormArray, AngularFormGroup } from './types';

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

type AnimalsForm = AngularFormArray<Animal[]>;
type AnimalForm2 = AngularFormGroup<Animal>;
