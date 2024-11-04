// src/app/_services/authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://petstore.swagger.io/v2'; // URL base da API
  private apiKey = 'special-key';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'api_key': this.apiKey });
    return this.http.get(`${this.apiUrl}/user/login?username=${username}&password=${password}`, { headers });
  }

  saveUser(user: any, sessionMessage: string): void {
    // Salva os dados do usuário e sessão no localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('session', sessionMessage); // Salva a sessão
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('session');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('session'); // Verifica se a sessão existe
  }
}
