import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './componentes/products/products.component';
import { ProductdetailsComponent } from './componentes/productdetails/productdetails.component';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { DivpositionsComponent } from './prueba/divpositions/divpositions.component';
import { ReviewsComponent } from './componentes/reviews/reviews.component';
import { LoginComponent } from './componentes/users/login/login.component';
import { RegistroComponent } from './componentes/users/registro/registro.component';
import { Favoritos1Component } from './componentes/favoritos1/favoritos1.component';
import { ProfileComponent } from './componentes/users/profile/profile.component';
import { Registro1Component } from './componentes/users/registro1/registro1.component';
import { Registro2Component } from './componentes/users/registro2/registro2.component';
import { Registro3Component } from './componentes/users/registro3/registro3.component';
import { CursoComponent } from './componentes/bootstrap/curso/curso.component';
import { Registro4Component } from './componentes/users/registro4/registro4.component';


const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'home', component: ProductsComponent },
  { path: 'favoritos', component: FavoritosComponent },
  { path: 'favoritos1', component: Favoritos1Component },
  { path: 'producto/:id', component: ProductdetailsComponent },
  { path: 'productos/:id/reviews', component: ReviewsComponent },
  { path: 'prueba', component: DivpositionsComponent },
  { path: 'user/login', component: LoginComponent},
  { path: 'user/registro', component: RegistroComponent},
  { path: 'user/registro1', component: Registro1Component},
  { path: 'user/registro2', component: Registro2Component},
  { path: 'user/registro3', component: Registro3Component},
  { path: 'user/registro4', component: Registro4Component},
  { path: 'user/profile', component: ProfileComponent},
  { path: 'bootstrap', component: CursoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
