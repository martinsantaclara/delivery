import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { finalize, delay, mapTo, map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { of, merge } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { UserI } from 'src/app/interfaces/user';
import { User } from 'firebase/app';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isEdited: boolean;
  nombre = '';
  email = '';
  photoUrl = '';
  direccion = '';
  telefono = '';
  usuario: User;
  userBaseDeDatos: UserI;
  emailDisabled = true;
  providerId = '';
  redirijido = false;
  showSpinner = false;

  formTemplate: FormGroup;

  constructor(private router: Router, private storage: AngularFireStorage, private authService: AuthService,
              private afAuth: AngularFireAuth, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.authService.isAuth().subscribe( user => {
      if (user) {
        this.userBaseDeDatos = JSON.parse(localStorage.getItem('usuario'));
        this.email = this.userBaseDeDatos.email;
        this.nombre = this.userBaseDeDatos.name;
        this.photoUrl = this.userBaseDeDatos.photoUrl;
        this.direccion = this.userBaseDeDatos.direccion;
        this.telefono = this.userBaseDeDatos.telefono;
        // this.authService.getIdUsuario.subscribe( id  => this.email = id);
        // this.authService.getNombreUsuario.subscribe( nom  => this.nombre = nom);
        // this.authService.getUrlImagenUsuario.subscribe( url  => this.photoUrl = url);
        // this.authService.getDireccionUsuario.subscribe( dir  => this.direccion = dir);
        // this.authService.getTelefonoUsuario.subscribe( tel  => this.telefono = tel);

        this.providerId = user.providerData[0].providerId;
        this.emailDisabled = this.providerId !== 'password';
        this.formTemplate = new FormGroup({
          name: new FormControl(this.nombre),
          email: new FormControl({value: this.email, disabled: this.emailDisabled}),
          photoURL: new FormControl(this.photoUrl),
          direccion: new FormControl(this.direccion),
          telefono: new FormControl(this.telefono)
        });
        this.usuario = user;
        this.imgSrc = this.photoUrl;
      } else {
        this.toastrService.error('Error', 'Debes acceder para modificar tu perfil');
      }
    });
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = '/assets/imagenes/userProfile.png';
      this.selectedImage = null;
    }
  }

  onSave(formValue, usuario: firebase.User) {
    const providerId = usuario.providerData[0].providerId;
    const redirijido = (providerId === 'password') && (this.email !== formValue.email);
    const cambios = redirijido || (this.nombre !== formValue.name) || (this.direccion !== formValue.direccion)
                               || (this.telefono !== formValue.telefono);
    let urlPhoto = this.photoUrl;
    if (this.selectedImage) {
      if (usuario.photoURL && urlPhoto.includes('firebasestorage')) {
        const storage = firebase.storage().refFromURL(usuario.photoURL);
        storage.delete().finally(() => {
          console.log('Delete succesfull');
        }).catch((error) => {
          console.log('Error delete imagen');
        });
      }
      const id = Math.random().toString(36).substring(2);
      const filePath = `uploads/fotosPerfil/profile_${id}`;
      const ref = this.storage.ref(filePath);
      this.showSpinner = true;
      // console.log(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((url) => {
            urlPhoto = url;
            usuario.updateProfile({
              displayName: formValue.name,
              photoURL: url
            });

            if (providerId === 'password') {
              usuario.updateEmail(formValue.email) ;
              this.email = formValue.email;
            }
            this.userService.updateUser(usuario.uid, formValue.name, this.email, url, this.direccion, this.telefono)
            .finally(() => {
              this.nombre = formValue.name;
              this.photoUrl = url;
              this.direccion = formValue.direccion;
              this.telefono = formValue.telefono;
              this.formTemplate = new FormGroup({
                name: new FormControl(this.nombre),
                email: new FormControl({value: this.email, disabled: this.emailDisabled}),
                photoURL: new FormControl(this.photoUrl),
                direccion: new FormControl(this.direccion),
                telefono: new FormControl(this.telefono)
              });
              this.selectedImage = null;
              this.showSpinner = false;
            });
          });
        })
      ).subscribe();
    } else {
      if (cambios) {
        this.showSpinner = true;
        if (redirijido) {
          usuario.updateEmail(formValue.email) ;
          this.email = formValue.email;
        }
        if (this.nombre !== formValue.name || (this.direccion !== formValue.direccion) || (this.telefono !== formValue.telefono)) {
          usuario.updateProfile({ displayName: formValue.name })
          .finally(() => {
            this.userService.updateUser(usuario.uid, formValue.name, this.email, usuario.photoURL, this.direccion, this.telefono);
          });
        }

        this.nombre = formValue.name;
        this.photoUrl = urlPhoto;
        this.direccion = formValue.direccion;
        this.telefono = formValue.telefono;
        this.formTemplate = new FormGroup({
          name: new FormControl(this.nombre),
          email: new FormControl({value: this.email, disabled: this.emailDisabled}),
          photoURL: new FormControl(this.photoUrl),
          direccion: new FormControl(this.direccion),
          telefono: new FormControl(this.telefono)
        });
        this.showSpinner = false;
      }
    }
    this.isEdited = false;
    if (redirijido) {
      alert('Ha cambiado su credencial de acceso, será redirigido al Ingreso!!!');
      this.router.navigate(['user/login']);
    }
  }

  Edicion(ed: boolean, user: firebase.User) {
    if (ed) {
      this.formTemplate.setValue({
        name: this.nombre,
        email: this.email,
        photoURL: this.photoUrl,
        direccion: this.direccion,
        telefono: this.telefono
      });
      if (this.photoUrl) {
        this.imgSrc = this.photoUrl;
      } else {
        this.imgSrc = '/assets/imagenes/userProfile.png';
      }
    }
    this.isEdited = !ed;
  }

  Salir() {
    history.back();
  }

}
