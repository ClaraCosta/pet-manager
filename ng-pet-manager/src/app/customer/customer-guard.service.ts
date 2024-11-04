// src/app/customer/customer-guard.service.ts
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CustomerFormComponent } from './customer-form.component';

@Injectable()
export class CustomerEditGuard implements CanDeactivate<CustomerFormComponent> {
  canDeactivate(component: CustomerFormComponent): boolean {
    if (component.customerForm && component.customerForm.dirty) {
      const customerName = component.customerForm.get('firstName')?.value || 'New Customer';
      return confirm(`Navigate away and lose all changes to ${customerName}?`);
    }
    return true;
  }
}
