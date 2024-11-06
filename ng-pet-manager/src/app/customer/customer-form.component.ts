import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from './customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html'
})
export class CustomerFormComponent implements OnInit {
  pageTitle: string;
  customerForm: FormGroup;
  customer: Customer;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });

    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.isEditMode = true;
      this.pageTitle = "Edit User";
      this.customerService.getCustomer(username).subscribe(customer => {
        this.customer = customer;
        this.customerForm.patchValue(this.customer);
      });
    } else {
      this.isEditMode = false;
      this.pageTitle = "Add User";
      this.customer = {} as Customer;
    }
  }

  saveCustomer(): void {
    if (this.customerForm.valid) {
      const newCustomer = { ...this.customer, ...this.customerForm.value };
      if (this.isEditMode) {
        this.customerService.updateCustomer(this.customer.username, newCustomer)
          .subscribe(() => this.router.navigate(['/customers']));
      } else {
        this.customerService.createCustomer(newCustomer)  // Chama o método de criação
          .subscribe(() => this.router.navigate(['/customers'])); // Redireciona após criação
      }
    }
  }

  deleteCustomer(): void {
    if (this.isEditMode && this.customer.username) {
      if (confirm(`Are you sure you want to delete the user: ${this.customer.username}?`)) {
        this.customerService.deleteCustomer(this.customer.username)
          .subscribe(() => this.router.navigate(['/customers']));
      }
    }
  }
}
