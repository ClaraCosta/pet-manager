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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.model.username = "Admin@test.com";
    this.model.password = "password";
  }

  login() {
    this.isValidating = true;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      response => {
        if (response.code === 200) { // Verifica se o login foi bem-sucedido
          console.log('Login realizado com sucesso:', response);
          // Salva os dados de autenticação e sessão
          this.authenticationService.saveUser(this.model, response.message);
          
          // Emite um evento de autenticação e redireciona para o dashboard
          this.isAuth.emit(true);
          this.router.navigate(['/dashboard']); // Redireciona para o dashboard
        }
      },
      error => {
        console.error('Erro de login:', error);
        this.isValidating = false;
      },
      () => {
        this.isValidating = false;
      }
    );
  }
}
