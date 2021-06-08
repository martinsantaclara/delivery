import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Categoria } from '../interfaces/categoria';
import { Producto } from '../interfaces/producto';
import { Carrito } from '../interfaces/carrito';
import { Item } from '../interfaces/item';
import { Favorito } from '../interfaces/favorito';
import { Review } from '../interfaces/review';

import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class DatasourceService {

  constructor(private afs: AngularFirestore) { }

  getAllProductos(): Observable<Producto[]> {
    return this.afs.collection<Producto>('productos').valueChanges({idField: 'id'});
  }

  getProductoById(id: string): Observable<Producto> {
    return this.afs.doc<Producto>(`productos/${id}`).valueChanges();
  }

  getAllCategorias(): Observable<Categoria[]> {
    return this.afs.collection<Categoria>('categorias', ref => ref.orderBy('ranking')).valueChanges();
  }

  getCarritoById(idCarrito: string): Observable<Carrito> {
    console.log(idCarrito);
    return this.afs.doc<Carrito>(`carrito/${idCarrito}`).valueChanges();
  }

  addCarrito(id: string, itemsPedido: Item[], totalPedido: number) {
    this.afs.collection('carrito').doc(id).set({
      items: itemsPedido,
      total: totalPedido
    });
  }

  updateCarrito(id: string, itemsPedido: Item[], totalPedido: number) {
    this.afs.collection('carrito').doc(id).update({
      items: itemsPedido,
      total: totalPedido
    });
  }

  deleteCarrito(id: string) {
    this.afs.collection('carrito').doc(id).delete();
  }

  getFavoritosById(id: string): Observable<Favorito> {
    return this.afs.doc<Favorito>(`favoritos/${id}`).valueChanges();
  }

  // addFavorito(id: string, prod: string[]) {
  //   this.afs.collection('favoritos').doc(id).set({
  //     productos: prod
  //   });
  // }

  addFavorito(id: string, produId: string) {
    this.afs.collection('favoritos').doc(id).set({
      productos: firebase.firestore.FieldValue.arrayUnion(produId)
    });
  }

  updateFavorito(id: string, produId: string) {
    this.afs.collection('favoritos').doc(id).update({
      productos: firebase.firestore.FieldValue.arrayUnion(produId)
    });
  }

  getReviewsById(id: string): Observable<Review> {
    return this.afs.doc<Review>(`reviews/${id}`).valueChanges();
  }

}
