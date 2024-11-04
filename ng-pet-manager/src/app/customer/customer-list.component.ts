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
  customers: Customer[];
  displayedColumns = ["username", "firstName", "lastName", "email", "phone", "actions"];
  dataSource: MatTableDataSource<Customer>;

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
        this.customers = []; 
      }
    );
  }

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

  deleteCustomer(username: string): void {
    this.customerService.deleteCustomer(username).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.username !== username);
      this.dataSource.data = this.customers;
      this.snackBar.open("User deleted successfully", "Close", { duration: 2000 });
    });
  }
}
