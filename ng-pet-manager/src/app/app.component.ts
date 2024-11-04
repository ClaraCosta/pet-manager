import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Breakpoints, BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnChanges, OnDestroy {
  title = 'ng crm';
  user: any = null;
  isMobile: boolean;
  mode = "side";
  uiContent = "content";
  progrssBarClass = "progress-bar";
  isloading = true;

  constructor(
    private router: Router,
    public authService: AuthenticationService,
    private breakpointObserver: BreakpointObserver
  ) {
    console.log("AppComponent constructor");

    this.isloading = true;

    // Configuração para detectar dispositivos móveis
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true;
        this.mode = "over";
        this.uiContent = "mobile-content";
      } else {
        this.isMobile = false;
        this.mode = "side";
        this.uiContent = "content";
      }
    });

    // Intercepta eventos de navegação para mostrar barra de progresso
    this.router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  ngOnChanges() {
    console.log("AppComponent ngOnChanges");
  }

  ngOnInit(): void {
    console.log("AppComponent ngOnInit");
    this.user = this.authService.getUser();  // Obtém o usuário logado, se houver
    this.isloading = false;
  }

  logout(): void {
    this.authService.logout();  // Limpa os dados de autenticação do usuário
    this.user = null;  // Limpa o usuário localmente
    this.router.navigate(['login']);  // Redireciona para a página de login
  }

  isAuth(isAuth?: any) {
    if (isAuth) {
      this.user = this.authService.getUser();  // Atualiza o usuário após autenticação bem-sucedida
    }
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.progrssBarClass = "progress-bar";
      this.isloading = true;
    }
    if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
      this.progrssBarClass = "progress-bar-hidden";
      this.isloading = false;
    }
  }

  ngOnDestroy() {
    this.breakpointObserver.ngOnDestroy();  // Limpa o observador de breakpoint
    // Outras limpezas, se necessário
  }
}
