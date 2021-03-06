import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { SalaService } from '../../app/sala-service'
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  salas;

  constructor(public navCtrl: NavController, 
              private salaService: SalaService,
              public alertCtrl: AlertController,
              db: AngularFireDatabase) {
    this.salas = this.salaService.fetchSalas();
  }

  onEntrarClick(nome, sala, icone) {   
    const usuario = {
      nome: nome,
      icone: icone
    }
    let i = 0;
    this.salaService.getUsuario(sala, nome).subscribe(x => {
      if(i == 0){
        i = 1
        if(!x.some(y => y.nome === usuario.nome)){
          this.navCtrl.push('ChatPage', {
            usuarioParam: usuario,
            salaParam: sala,
            usuarioKey: this.salaService.addUsuario(usuario, sala)
          })
        } 
        else {
          this.alertCtrl.create({
            title: 'Usuario já existente.',
            subTitle: 'O nome o usuario deve ser único.',
            buttons: ['OK']
          }).present();
        }
      }
    }); 
  }
}
