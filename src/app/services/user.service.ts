import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore'; // Importa las funciones necesarias
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async registerUser(nombre: string, correo: string, contrasena: string, saldo: number) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, correo, contrasena);
      const userId = userCredential.user?.uid;

      if (userId) {
        // Usando collection y doc para acceder a la colección y documento
        const userDocRef = doc(this.firestore, `usuarios/${userId}`);
        await setDoc(userDocRef, {
          idsocio: userId,
          nombre: nombre,
          correo: correo,
          saldo: saldo,
        });
        console.log("Usuario registrado correctamente.");
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  }
}
