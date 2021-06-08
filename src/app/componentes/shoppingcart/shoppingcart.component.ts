import { Component, OnInit, Injectable} from '@angular/core';
import { DatasourceService } from 'src/app/services/datasource.service';
import { Carrito } from 'src/app/interfaces/carrito';
import { Item } from 'src/app/interfaces/item';
import { Producto } from 'src/app/interfaces/producto';
import { globals } from 'src/app/globals/global';
import { User } from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  items: Item[];
  paddingLeftTotal = 14.5;

  idUsuario: string;

  pedidoActual: Carrito;
  carrito: Carrito;

  constructor(private datasource: DatasourceService, private authService: AuthService, private toastrService: ToastrService) {}

  ngOnInit() {

    this.paddingLeftTotal = 15.2;

    this.authService.getIdUsuario.subscribe( id => {
      console.log('ngOninit shopping');
      this.idUsuario = id;
      console.log(id);

      this.datasource.getCarritoById(this.idUsuario)
      .subscribe(car => {
        this.carrito = car;
        if (this.carrito !== undefined) {
          console.log('carrito');
          this.carrito.id = this.idUsuario;
          this.pedidoActual = this.carrito;
          localStorage.setItem('pedido', JSON.stringify(this.carrito));
          globals.pedido = this.pedidoActual;
          this.items = this.pedidoActual.items;
          if (this.pedidoActual.total < 1000) {
            this.paddingLeftTotal = 15.2;
          } else if (this.pedidoActual.total < 10000) {
            this.paddingLeftTotal = 14.3;
          } else {
            this.paddingLeftTotal = 13.65;
          }
        }
      });

    } );






  }

  agregaItem(uid, producto: Producto) {

    this.toastrService.error('Adding Product to Cart', 'Product Adding to the cart');

    let esNuevo = false;
    let usuario: string;
    let lines: Item [] = [];
    let totalLines: number;
    const carritoStorage: Carrito = JSON.parse(localStorage.getItem('pedido'));
    if (globals.pedido !== null) {
      const linea = globals.pedido.items.find(item => item.idProducto === producto.id);
      if (linea !== undefined) {
        linea.cantidad += 1;
        linea.subtotal += producto.precio;
      } else {
        globals.pedido.items.push(
          {
            cantidad: 1,
            idProducto: producto.id,
            nombreProducto: producto.text,
            precio: producto.precio,
            subtotal: producto.precio
          }
        );
      }
      this.items = globals.pedido.items;
      globals.pedido.total += producto.precio;


      this.datasource.updateCarrito(globals.pedido.id, globals.pedido.items, globals.pedido.total);
      usuario = globals.pedido.id; lines = globals.pedido.items; totalLines = globals.pedido.total;
    } else {
      esNuevo = true;
      const nuevoItem: Item[] = [
        {
          cantidad: 1,
          idProducto: producto.id,
          nombreProducto: producto.text,
          precio: producto.precio,
          subtotal: producto.precio
        }
      ];

      console.log(uid);
      console.log(nuevoItem);
      console.log(producto.precio);


      // globals.pedido = this.datasource.addCarrito(this.idUsuario, nuevoItem, producto.precio);
      globals.pedido = this.datasource.addCarrito(uid, nuevoItem, producto.precio);

      this.items = nuevoItem;
      // usuario = this.idUsuario; lines = this.items; totalLines = producto.precio;
      usuario = uid; lines = this.items; totalLines = producto.precio;

    }

    this.pedidoActual = {
      id: usuario,
      items: lines,
      total: totalLines
    };

    if (this.pedidoActual.total < 1000) {
      this.paddingLeftTotal = 15.2;
    } else if (this.pedidoActual.total < 10000) {
      this.paddingLeftTotal = 14.3;
    } else {
      this.paddingLeftTotal = 13.65;
    }

  }

  modificaItem(item: Item, agrega: boolean) {
    const indice = globals.pedido.items.findIndex(li => li.idProducto === item.idProducto);
    if (agrega) {
      globals.pedido.items[indice].cantidad += 1;
      globals.pedido.items[indice].subtotal += item.precio;
      globals.pedido.total += item.precio;
    } else {
      if (globals.pedido.items[indice].cantidad > 1) {
        globals.pedido.items[indice].cantidad -= 1;
        globals.pedido.items[indice].subtotal -= item.precio;
      } else {
        globals.pedido.items.splice(indice, 1);
      }
      globals.pedido.total -= item.precio;
    }

    this.items = globals.pedido.items;
    this.pedidoActual = globals.pedido;

    // document.getElementById('total').style.paddingLeft = (this.pedidoActual.total < 1000 ? '15.2rem' : '14.3rem');
    if (this.pedidoActual.total < 1000) {
      this.paddingLeftTotal = 15.2;
    } else if (this.pedidoActual.total < 10000) {
      this.paddingLeftTotal = 14.3;
    } else {
      this.paddingLeftTotal = 13.65;
    }
    if (this.pedidoActual.total === 0) {
      this.datasource.deleteCarrito(this.pedidoActual.id);
      globals.pedido = null;
      this.pedidoActual = undefined;
    } else {
      this.datasource.updateCarrito(this.pedidoActual.id, this.pedidoActual.items, this.pedidoActual.total);
    }

  }

  borraPedidoActual() {
    if (this.pedidoActual !== undefined) {
      this.datasource.deleteCarrito(this.pedidoActual.id);
      globals.pedido = null;
      this.pedidoActual = undefined;
    }
  }

  confirmaPedido() {
    console.log(this.pedidoActual);
    console.log(this.items);
  }
}
