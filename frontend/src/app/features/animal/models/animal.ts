import {AnimalType} from "@app/features/animal/models/animal-type";

export interface Animal {
  id?: number;
  name: string;
  type: AnimalType;
}
