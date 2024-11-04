// src/app/login/login.component.ts
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: "login-form",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  @Output() isAuth = new EventEmitter<boolean>();
  model: any = {};
  isValidating = false;
  returnUrl: string;
  errorMessage: string = '';  // Adicione uma variável para armazenar a mensagem de erro

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
  }

  // src/app/login/login.component.ts
login() {
  console.log("Login button pressed"); // Depuração
  this.isValidating = true;
  this.errorMessage = '';

  this.authenticationService.login(this.model.username, this.model.password).subscribe(
    success => {
      this.isValidating = false;
      if (success) {
        this.isAuth.emit(true);
        this.router.navigate([this.returnUrl]);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    },
    error => {
      this.isValidating = false;
      this.errorMessage = 'Login failed. Please try again later.';
      console.error('Erro de login:', error);
    }
  );
}

}
