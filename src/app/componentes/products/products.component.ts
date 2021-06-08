import { Component, OnInit} from '@angular/core';
import { DatasourceService } from 'src/app/services/datasource.service';
import * as $ from 'jquery';
import { Categoria } from 'src/app/interfaces/categoria';
import { NgxSpinnerService } from 'ngx-spinner';
import { Producto } from 'src/app/interfaces/producto';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  soloCategorias = [];
  categorias: Categoria[];
  productos: Producto[];

  constructor(private datasource: DatasourceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.spinner.show();

    // El usuario todavia no está logeado!!!
    // globals.idUser = 'nadie@yahoo.com.ar';
    // globals.idUser = 'topito@gmail.com';

    this.datasource.getAllProductos().subscribe( p => {
      this.productos = p;
      localStorage.setItem('totalProductos', String(this.productos.length));
      localStorage.setItem('iterados', '0');

      this.datasource.getAllCategorias().subscribe( c => {
        this.categorias = c;
        this.categorias.forEach( cat => {
          this.soloCategorias.push(cat.categoria);
        });
      });
    });
  }

  public hideSpinner() {
    this.spinner.hide();
  }

  corrigeScroll(id: string, cantidadCategorias: number) {

    const $id = '#' + id;
    const $container = $('#contenedorScroll');
    const $scrollTo = $($id);

    // $container.scrollTop( $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 10);

    // Or you can animate the scrolling:
    $container.animate({
        scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop() - 10
    });​

    // const sv = document.documentURI;
    // const ocupa = Math.trunc((window.outerWidth - 17) * 96.5  / 16000);
    // const espacio = cantidadCategorias / ocupa;
    // const filas = Math.trunc(espacio) + (cantidadCategorias % ocupa === 0 ? 0 : 1);
    // const ajuste = filas * 150;
    // window.scroll(0, sv - 300);
    // alert('AJUSTE: ' + ajuste);
    // window.scroll(0, 50);
  }

}
