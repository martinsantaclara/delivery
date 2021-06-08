import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { DatasourceService } from 'src/app/services/datasource.service';
import { Producto } from 'src/app/interfaces/producto';
import { Review } from 'src/app/interfaces/review';
import { Observable, forkJoin } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {

  constructor(private datasource: DatasourceService, private route: ActivatedRoute, private spinner: NgxSpinnerService) { }

  producto: Producto;
  reviews: Review;
  tooltip;

  ngOnInit() {

    this.spinner.show();
    const id = 'id';
    const idProducto = this.route.snapshot.params[id];

    this.datasource.getProductoById(idProducto).subscribe(res => {
      this.producto = res;
      this.producto.id = idProducto;
      if (this.producto.reviews === 0) {
        this.tooltip = 'sé el primero en dar una opinión';
      } else {
        this.tooltip = 'ver opiniones (' + this.producto.reviews + ')';
      }
    });

    this.datasource.getReviewsById(idProducto).subscribe(rev => {
      this.reviews = rev;
      if ( this.reviews !== undefined) {
        this.reviews.id = idProducto;
      }
    });

    setTimeout(() => { this.spinner.hide(); }, 5000);

  }

}

