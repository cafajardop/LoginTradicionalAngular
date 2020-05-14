import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService, 
    private router: Router) { }

  ngOnInit() {
    this.usuarioLogin = new UsuarioModel();
    if(localStorage.getItem('email')){
      this.usuarioLogin.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(form: NgForm){
    if(form.invalid){return;}

    // console.log(this.usuarioLogin);
    // console.log(form);
    Swal.fire({
      allowOutsideClick: false,
      icon:'info',
      text:'Espere por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuarioLogin)
    .subscribe(resp =>{
        console.log(resp);
        Swal.close();
        
        if(this.recordarme){
          localStorage.setItem('email', this.usuarioLogin.email);
        }
        
        this.router.navigateByUrl('/home');
    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        allowOutsideClick: false,
        icon:'error',
        title:'Error al autenticar',
        text: err.error.error.message
      });
    })
  }


}
