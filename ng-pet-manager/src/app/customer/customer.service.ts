import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:8000/api/user/';

  constructor(private http: HttpClient) {}

  getCustomer(username: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}${username}/`);
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  updateCustomer(username: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}${username}/`, customer);
  }

  deleteCustomer(username: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${username}/`);
  }
}
