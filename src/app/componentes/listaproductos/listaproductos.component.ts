import { Component, OnInit, Input} from '@angular/core';
import { TruncatePipe } from 'src/app/pipes/truncate.pipe';
import { Producto } from 'src/app/interfaces/producto';
import { DatasourceService } from 'src/app/services/datasource.service';
import { Observable, of } from 'rxjs';
import { pluck, map, mergeMap } from 'rxjs/operators';
import { Favorito } from 'src/app/interfaces/favorito';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listaproductos',
  templateUrl: './listaproductos.component.html',
  styleUrls: ['./listaproductos.component.scss']
})
export class ListaproductosComponent implements OnInit {

  @Input() categoria: string;
  @Input() productos: Producto[];




  favoritos: Favorito;
  idUsuario: string;
  prodsPorCategoria: Producto[];

  constructor(private datasource: DatasourceService, private truncate: TruncatePipe, private authService: AuthService) { }

  ngOnInit() {

    this.authService.getIdUsuario.subscribe( id =>  this.idUsuario = id);


    // this.datasource.getAllProductos(this.categoria).subscribe( p => {
    //   this.productos = p;

    this.prodsPorCategoria = this.productos.filter(produ => produ.categoria === this.categoria);

    this.datasource.getFavoritosById(this.idUsuario).subscribe( f => {
      this.favoritos = f;
      if (this.favoritos !== undefined) {
        this.favoritos.id = this.idUsuario;
        this.prodsPorCategoria.forEach(produ => {
          if ((this.favoritos.productos.findIndex(fav => fav === produ.id) !== -1)) {
            produ.favorito = true;
          }
        });
       }
    });

  }

  actualizaFavorito(nuevoFavorito) {
    this.favoritos = nuevoFavorito;
  }

}
