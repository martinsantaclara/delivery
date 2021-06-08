import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { ShoppingcartComponent } from '../shoppingcart/shoppingcart.component';
import { ProductsComponent } from '../products/products.component';

import { DatasourceService } from 'src/app/services/datasource.service';
import { Favorito } from 'src/app/interfaces/favorito';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

  // @Input() categoria: string;
  @Input() producto: Producto;
  @Input() favoritos: Favorito;

  @Output() favoritoActualizado = new EventEmitter<any>();

  totalProductos: boolean;
  idUsuario: string;

  constructor(private shopping: ShoppingcartComponent, private productsComponent: ProductsComponent,
              private datasource: DatasourceService, private authService: AuthService) { }

  ngOnInit() {

    const cantProductos = Number(localStorage.getItem('totalProductos'));
    const productosIterados = Number(localStorage.getItem('iterados'));
    localStorage.setItem('iterados', String(productosIterados + 1));
    this.totalProductos = cantProductos === productosIterados + 1;

    this.authService.getIdUsuario.subscribe( id =>  this.idUsuario = id);

  }

  ngAfterViewInit() {
    if (this.totalProductos) {
      localStorage.setItem('iterados', '0');
      this.productsComponent.hideSpinner();
    }
  }

  changeTruncate() {
    this.producto.truncate = !this.producto.truncate;
  }

  addToCart(producto: Producto) {
    if ( this.idUsuario !== null) {
      this.shopping.agregaItem(this.idUsuario, producto);
    } else {
      alert('Debe iniciar sesión para crear pedido');
    }
  }

  agregaFavorito(producto: Producto) {
    if (this.favoritos !== undefined) {
      this.favoritos.productos.push(producto.id);
      this.datasource.updateFavorito(this.favoritos.id, producto.id);
      producto.favorito = true;
      this.favoritoActualizado.emit(this.favoritos);
    } else if (this.idUsuario !== null) {
      this.favoritos = { id: this.idUsuario,
                        productos: [producto.id]
                       };
      this.datasource.addFavorito(this.idUsuario, producto.id);
      producto.favorito = true;
      this.favoritoActualizado.emit(this.favoritos);
    } else {
      alert('Debe iniciar sesión para agregar favoritos');
    }
  }

}
