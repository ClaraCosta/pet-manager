import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token); // Armazena o token
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Verifica se o token existe
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token
    this.router.navigate(['/login']); 
  }


  getUser(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return { token };
    }
    return null;
  }

}
