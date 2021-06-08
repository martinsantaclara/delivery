import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './common/navbar/navbar.component';
import { ListaproductosComponent } from './componentes/listaproductos/listaproductos.component';
import { ProductsComponent } from './componentes/products/products.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ProductComponent } from './componentes/product/product.component';
import { ShoppingcartComponent } from './componentes/shoppingcart/shoppingcart.component';
import { ProductdetailsComponent } from './componentes/productdetails/productdetails.component';
import { DatasourceService } from './services/datasource.service';
import { FavoritosComponent } from './componentes/favoritos/favoritos.component';
import { RatingstarsComponent } from './common/ratingstars/ratingstars.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DivpositionsComponent } from './prueba/divpositions/divpositions.component';
import { LoginComponent } from './componentes/users/login/login.component';
import { ReviewsComponent } from './componentes/reviews/reviews.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './common/footer/footer.component';
import { RegistroComponent } from './componentes/users/registro/registro.component';
import { ToastrService } from './services/toastr.service';
import { Favoritos1Component } from './componentes/favoritos1/favoritos1.component';
import { ProfileComponent } from './componentes/users/profile/profile.component';
import { Registro1Component } from './componentes/users/registro1/registro1.component';
import { PasswordValidationDirective } from './validations/password-validations.directive';
import { Registro2Component } from './componentes/users/registro2/registro2.component';
import { Registro3Component } from './componentes/users/registro3/registro3.component';
import { CompareValidatorDirective } from './validations/compare-validator.directive';
import { CursoComponent } from './componentes/bootstrap/curso/curso.component';
import { Registro4Component } from './componentes/users/registro4/registro4.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaproductosComponent,
    ProductsComponent,
    TruncatePipe,
    ProductComponent,
    ShoppingcartComponent,
    ProductdetailsComponent,
    FavoritosComponent,
    RatingstarsComponent,
    DivpositionsComponent,
    LoginComponent,
    ReviewsComponent,
    FooterComponent,
    RegistroComponent,
    Favoritos1Component,
    ProfileComponent,
    Registro1Component,
    PasswordValidationDirective,
    Registro2Component,
    Registro3Component,
    CompareValidatorDirective,
    CursoComponent,
    Registro4Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [AngularFireAuthModule, TruncatePipe, ShoppingcartComponent, AngularFirestoreModule,
              AngularFireStorage, DatasourceService, AuthService, ToastrService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
