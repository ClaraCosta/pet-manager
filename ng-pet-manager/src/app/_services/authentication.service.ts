// src/app/_services/authentication.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'https://petstore.swagger.io/v2/user/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    console.log('AuthenticationService login() chamado'); // Adicione esse log

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.apiUrl}?username=${username}&password=${password}`, { headers }).pipe(
      map((response: any) => {
        console.log('Resposta da API:', response); // Log da resposta
        if (response.code === 200) {
          localStorage.setItem('currentUser', JSON.stringify({ username, session: response.message }));
          return true;
        }
        return false;
      }),
      catchError((error) => {
        console.error('Erro na chamada de login:', error); // Log de erro
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
