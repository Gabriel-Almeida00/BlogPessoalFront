import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  ConfirmarSenha: string
  tipoUsuario: string
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  ConfirmaSenha(event: any) {
    this.ConfirmarSenha = event.target.value
  }

  TipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.type = this.tipoUsuario
    if (this.user.senha != this.ConfirmarSenha) {
      alert('As Senhas estão diferentes.')
    } else {
      this.authService.cadastrar(this.user).subscribe((resp:User) =>{
        this.user = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSucess('Usuário Cadastrado com Sucesso.')
      })
    }
  }
}
