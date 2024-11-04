import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Customer } from './customer';

@Injectable()
export class CustomerService {
  private apiUrl = 'https://petstore.swagger.io/v2/user';  // Base URL da `PetAPI`

  constructor(private http: HttpClient) {}

    // Método para criar usuários com array (deve ser POST)
    createUsersWithArray(customers: Customer[]): Observable<any> {
      return this.http.post(`${this.apiUrl}/createWithArray`, customers);
    }

    getCustomers(): Observable<Customer[]> {
      // Usando um mock como exemplo, pois não há endpoint GET direto para todos os usuários na `PetAPI`
      return new Observable(observer => {
        // Mock de dados de clientes
        observer.next([
          { username: 'user1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
          { username: 'user2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' }
        ]);
        observer.complete();
      });
    }
  // Obtém um único usuário pelo nome de usuário
  getCustomer(username: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Cria um novo usuário
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}`, customer)
      .pipe(catchError(this.handleError));
  }

  // Atualiza um usuário existente
  updateCustomer(username: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/${username}`, customer)
      .pipe(catchError(this.handleError));
  }

  // Exclui um usuário pelo nome de usuário
  deleteCustomer(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${username}`)
      .pipe(catchError(this.handleError));
  }

  // Função de manipulação de erros
  private handleError(error: any): Observable<never> {
    console.error('Ocorreu um erro:', error);
    return throwError(error.message || 'Erro do servidor');
  }
}
