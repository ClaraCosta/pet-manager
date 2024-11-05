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
  errorMessage: string = '';  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/dashboard";
    this.authenticationService.logout(); 
  }

  login() {
    this.isValidating = true; 
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      data => {
        localStorage.setItem('token', data.token); 
        this.isAuth.emit(true); 
        this.isValidating = false;
        this.router.navigate([this.returnUrl]); 
      },
      error => {
        this.isValidating = false;
        this.errorMessage = 'Invalid username or password'; // Exibir mensagem de erro
        console.error('Erro no login:', error);
      }
    );
  }
}
