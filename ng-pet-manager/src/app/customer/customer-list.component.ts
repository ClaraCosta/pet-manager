// src/app/customer/customer-list.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from './customer';
import { CustomerService } from './customer.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog.component';

@Component({
  selector: 'customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  pageTitle: string = 'User Management';
  customers: Customer[] = [];
  displayedColumns = ["username", "firstName", "lastName", "email", "phone", "actions"];
  dataSource: MatTableDataSource<Customer>;

  // Propriedades adicionais
  imageWidth: number = 30;
  imageMargin: number = 2;
  searchFilter: any = {
    firstname: '',
    lastname: '',
    customerDate: '',
    customerName: ''
  };

  constructor(
    private customerService: CustomerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(
      customers => {
        this.customers = customers;
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.error('Failed to load customers:', error);
        this.customers = []; // Define como uma lista vazia em caso de erro
      }
    );
  }

  // Método para resetar a lista de clientes
  reset(): void {
    this.getCustomers();
    this.searchFilter = {
      firstname: '',
      lastname: '',
      customerDate: '',
      customerName: ''
    };
  }

  // Método para aplicar filtro na tabela
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // Abre o diálogo de confirmação para excluir um cliente
  openDialog(username: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Confirm', message: `Are you sure you want to delete this user: ${username}?` }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.deleteCustomer(username);
      }
    });
  }

  // Exclui um cliente pelo nome de usuário
  deleteCustomer(username: string): void {
    this.customerService.deleteCustomer(username).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.username !== username);
      this.dataSource.data = this.customers;
      this.snackBar.open("User deleted successfully", "Close", { duration: 2000 });
    });
  }

  // Filtra a lista de clientes de acordo com os filtros especificados
  searchCustomers(filters: any): void {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers.filter(customer => {
        let match = true;
        Object.keys(filters).forEach(key => {
          match = match && customer[key]?.toLowerCase().includes(filters[key].toLowerCase());
        });
        return match;
      });
      this.dataSource.data = this.customers;
    });
  }

  // Reseta o filtro de pesquisa
  resetSearchFilter(sidenav: any): void {
    sidenav.toggle();
    this.searchFilter = {
      firstname: '',
      lastname: '',
      customerDate: '',
      customerName: ''
    };
    this.getCustomers();
  }
}
