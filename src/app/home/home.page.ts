import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';
import { PerfilService } from '../servicios/perfil.service'
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
    private loadingController: LoadingController,
    private alertController : AlertController,
    private perfilService:PerfilService,
    private authService:AuthService,
    private router:Router,


  ) {}
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

  async changeImage(){}

}
