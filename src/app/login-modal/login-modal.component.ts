import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  username: string = '';
  password: string = '';

  @Output() close = new EventEmitter<void>();

  constructor(private router: Router, private auth: AngularFireAuth) {}

  closeModal() {
    this.close.emit();
  }

  async onSubmit() {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(this.username, this.password);
      // Usuario autenticado correctamente
      alert('¡Has iniciado sesión correctamente!');
      this.closeModal(); // Cierra el modal
    } catch (error) {
      console.log(this.username,this.password);
      // Error en la autenticación
      alert('Error: Usuario o contraseña incorrectos');
    }
  }

  onRegister() {
    this.router.navigate(['registro']); // Navega al formulario de registro
  }
}
