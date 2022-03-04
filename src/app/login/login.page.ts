import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials : FormGroup;

  constructor(
    private form: FormBuilder,
    private loadingController: LoadingController,
    private alertController : AlertController,
    private authService: AuthService,
    private router:Router
    ) { }

  get password(){return this.credentials.get('password')}
  get email(){return this.credentials.get('password')}

  ngOnInit() {
    this.credentials = this.form.group({
      email:['',[Validators.required, Validators.required]],
      password: ['',[Validators.required, Validators.minLength]]
    });
  }

  async register(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if(user){this.router.navigateByUrl('/home', {replaceUrl:true});
    }else{
      this.showAlert('Registration failed', 'Try again');
    }
  }

  async login(){
    const loading = await this.loadingController.create();
    await loading.present();
    const user = await this.authService.login(this.credentials.value);
    await loading.dismiss();

    if(user){this.router.navigateByUrl('/home', {replaceUrl:true});
    }else{
      this.showAlert('Login failed', 'Try again');
    }
  }

  async showAlert(header, message){
    const alert = await this.alertController.create({
      header, message, buttons:['Ok'],
    });
    await alert.present();
  }

}
