import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  signInEmail: string = '';
  signInPassword: string = '';
  signUpEmail: string = '';
  isActive: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  onSignIn() {
    const payload = { email: this.signInEmail, password: this.signInPassword };
    this.http.post('http://127.0.0.1:5000/login', payload).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token); // Stocker le JWT
        this.router.navigate(['/main']); // Rediriger vers la page principale
      },
      (error) => console.error('Erreur de connexion', error)
    );
  }

  onSignUp() {
    const payload = { email: this.signUpEmail };
    this.http.post('http://127.0.0.1:5000/signup', payload).subscribe(
      () => alert('Un e-mail de création de compte vous a été envoyé !'),
      (error) => console.error('Erreur lors de la création du compte', error)
    );
  }

  onSignInClick() {
    console.log('isActive:', this.isActive);
    console.log('onSignInClick');
    this.isActive = false;
    console.log('isActive:', this.isActive);
  }
  onSignUpClick() {
    console.log('isActive:', this.isActive);
    console.log('onSignUpClick');
    this.isActive = true;
    console.log('isActive:', this.isActive);
  }
}
