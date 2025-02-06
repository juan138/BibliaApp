import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {


  public librosBiblia = {
    antiguoTestamento: [
      { numero: 1, nombre: "Génesis" , img:"GENESIS"},
      { numero: 2, nombre: "Éxodo",img:"EXODO" },
      { numero: 3, nombre: "Levítico",img:"LEVITICO" },
      { numero: 4, nombre: "Números",img:"NUMEROS" },
      { numero: 5, nombre: "Deuteronomio",img:"DEUTERONOMIO" },
      { numero: 6, nombre: "Josué",img:"JOSUE" },
      { numero: 7, nombre: "Jueces",img:"JUECES" },
      { numero: 8, nombre: "Rut",img:"RUT" },
      { numero: 9, nombre: "1 Samuel",img:"1SAMUEL" },
      { numero: 10, nombre: "2 Samuel",img:"2SAMUEL" },
      { numero: 11, nombre: "1 Reyes",img:"1REYES" },
      { numero: 12, nombre: "2 Reyes",img:"2REYES" },
      { numero: 13, nombre: "1 Crónicas",img:"1CRONICAS" },
      { numero: 14, nombre: "2 Crónicas",img:"2CRONICAS" },
      { numero: 15, nombre: "Esdras",img:"ESDRAS" },
      { numero: 16, nombre: "Nehemías",img:"NEHEMIAS" },
      { numero: 17, nombre: "Ester",img:"ESTER" },
      { numero: 18, nombre: "Job",img:"JOB" },
      { numero: 19, nombre: "Salmos",img:"SALMOS" },
      { numero: 20, nombre: "Proverbios",img:"PROVERBIOS" },
      { numero: 21, nombre: "Eclesiastés",img:"ECLESIASTES" },
      { numero: 22, nombre: "Cantares",img:"CANTARES" },
      { numero: 23, nombre: "Isaías",img:"ISAIAS" },
      { numero: 24, nombre: "Jeremías",img:"JEREMIAS" },
      { numero: 25, nombre: "Lamentaciones",img:"LAMENTACIONES" },
      { numero: 26, nombre: "Ezequiel",img:"EZEQUIEL" },
      { numero: 27, nombre: "Daniel",img:"DANIEL" },
      { numero: 28, nombre: "Oseas",img:"OSEAS" },
      { numero: 29, nombre: "Joel",img:"JOEL" },
      { numero: 30, nombre: "Amós",img:"AMOS" },
      { numero: 31, nombre: "Abdías",img:"ABDIAS" },
      { numero: 32, nombre: "Jonás",img:"JONAS" },
      { numero: 33, nombre: "Miqueas",img:"MIQUEAS" },
      { numero: 34, nombre: "Nahúm",img:"NAHUM" },
      { numero: 35, nombre: "Habacuc",img:"HABACUC" },
      { numero: 36, nombre: "Sofonías",img:"SOFONIAS" },
      { numero: 37, nombre: "Hageo",img:"HAGEO" },
      { numero: 38, nombre: "Zacarías",img:"ZACARIAS" },
      { numero: 39, nombre: "Malaquías",img:"MALAQUIAS" }
    ],
    nuevoTestamento: [
      { numero: 1, nombre: "Mateo",img:"MATEO" },
      { numero: 2, nombre: "Marcos",img:"MARCOS" },
      { numero: 3, nombre: "Lucas",img:"LUCAS" },
      { numero: 4, nombre: "Juan",img:"JUAN" },
      { numero: 5, nombre: "Hechos",img:"HECHOS" },
      { numero: 6, nombre: "Romanos",img:"ROMANOS" },
      { numero: 7, nombre: "1 Corintios",img:"1CORINTIOS" },
      { numero: 8, nombre: "2 Corintios",img:"2CORINTIOS" },
      { numero: 9, nombre: "Gálatas",img:"GALATAS" },
      { numero: 10, nombre: "Efesios",img:"EFESIOS" },
      { numero: 11, nombre: "Filipenses",img:"FILIPENSES" },
      { numero: 12, nombre: "Colosenses",img:"COLOSENSES" },
      { numero: 13, nombre: "1 Tesalonicenses",img:"1TESALONISENSES" },
      { numero: 14, nombre: "2 Tesalonicenses",img:"2TESALONISENSES" },
      { numero: 15, nombre: "1 Timoteo",img:"1TIMOTEO" },
      { numero: 16, nombre: "2 Timoteo",img:"2TIMOTEO" },
      { numero: 17, nombre: "Tito",img:"TITO" },
      { numero: 18, nombre: "Filemón",img:"FILEMON" },
      { numero: 19, nombre: "Hebreos",img:"HEBREOS" },
      { numero: 20, nombre: "Santiago",img:"SANTIAGO" },
      { numero: 21, nombre: "1 Pedro",img:"1PEDRO" },
      { numero: 22, nombre: "2 Pedro",img:"2PEDRO" },
      { numero: 23, nombre: "1 Juan",img:"1JUAN" },
      { numero: 24, nombre: "2 Juan",img:"2JUAN" },
      { numero: 25, nombre: "3 Juan",img:"3JUAN" },
      { numero: 26, nombre: "Judas",img:"JUDAS" },
      { numero: 27, nombre: "Apocalipsis",img:"APOCALIPSIS" }
    ]
  };

}
