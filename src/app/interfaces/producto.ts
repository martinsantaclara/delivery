export interface Producto {
  id: string;
  text: string;
  categoria: string;
  image: string;
  descripcion: string;
  precio: number;
  truncate: boolean;
  favorito: boolean;
  rating: number;
  ventas: number;
  informacion: string;
  reviews: number;
}
