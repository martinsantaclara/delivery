import { Item } from './item';

export interface Carrito {
  id: string;
  items: Item[];
  total: number;
}
