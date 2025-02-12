import { Component, OnInit } from '@angular/core';
import { AppModule } from './app.module';
import { BibliesSqliteService } from './services/biblies-sqlite.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent   implements OnInit {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  librosBiblia:any;
  constructor(public app : AppModule,
    private sqliteService: BibliesSqliteService,
    private loadingController: LoadingController
  ) {
    this.librosBiblia=app.librosBiblia;
  }

  async ngOnInit() {
    // Verificar si la base de datos existe y si no, crearla.
    await this.sqliteService.checkDatabaseExists();

    let existDb = localStorage.getItem("createdDb");
      if(existDb!='true'){
        const loading = await this.loadingController.create({
          message: 'Preparando para primer uso ...',
        });
        await loading.present();
        // Si la base de datos no existe, crearla y agregar los datos iniciales
        await this.sqliteService.createDatabase().then(resp => {
          if(resp){
            localStorage.setItem("createdDb",'true');
          }else{
            localStorage.setItem("createdDb",'false');
          }
          console.log("SC")
          loading.dismiss(); // Descartar el loading
        }).catch(err=>{
          console.log("ER")
          loading.dismiss(); // Descartar el loading
        });
      }
  }
}
