import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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

  ) {
    this.perfilService.getUserProfile().subscribe((data)=>{this.profile=data;})
  }
  async logout(){
    await this.authService.logout();
    this.router.navigateByUrl('/', {replaceUrl:true});
  }

  async changeImage(){
    const img = await Camera.getPhoto({
      quality:90,
      allowEditing:false,
      resultType:CameraResultType.Base64,
      source: CameraSource.Photos,
    });
    
    console.log(img);

    if(img){
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.perfilService.uploadImage(img);
      await loading.dismiss();

      if(!result){
        const alert = await this.alertController.create({
          header: 'Failed',
          message: 'Upload Failed', 
          buttons:['Ok'],

        });
        await alert.present();
      }

    }
  }

}
