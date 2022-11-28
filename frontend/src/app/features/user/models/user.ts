import {Animal} from "@app/features/animal/models/animal";

export interface User {
  id?: number;
  name: string;
  firstName: string;
  pets?: Animal[];
}
