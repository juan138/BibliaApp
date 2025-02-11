import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@ionic-native/sqlite/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },SQLite],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {


  public librosBiblia = {
    antiguoTestamento: [
      { numero: 1, nombre: "Génesis" , img:"GENESIS" , abrev : "GEN"},
      { numero: 2, nombre: "Éxodo",img:"EXODO" , abrev : "EX"},
      { numero: 3, nombre: "Levítico",img:"LEVITICO" , abrev : "LEV"},
      { numero: 4, nombre: "Números",img:"NUMEROS" , abrev : "NUM"},
      { numero: 5, nombre: "Deuteronomio",img:"DEUTERONOMIO" , abrev : "DEU"},
      { numero: 6, nombre: "Josué",img:"JOSUE" , abrev : "JOS"},
      { numero: 7, nombre: "Jueces",img:"JUECES" , abrev : "JUE"},
      { numero: 8, nombre: "Rut",img:"RUT" , abrev : "RT"},
      { numero: 9, nombre: "1 Samuel",img:"1SAMUEL" , abrev : "1 SAM"},
      { numero: 10, nombre: "2 Samuel",img:"2SAMUEL" , abrev : "2 SAM"},
      { numero: 11, nombre: "1 Reyes",img:"1REYES" , abrev : "1 REY"},
      { numero: 12, nombre: "2 Reyes",img:"2REYES" , abrev : "2 REY"},
      { numero: 13, nombre: "1 Crónicas",img:"1CRONICAS" , abrev : "1 CR"},
      { numero: 14, nombre: "2 Crónicas",img:"2CRONICAS" , abrev : "2 CR"},
      { numero: 15, nombre: "Esdras",img:"ESDRAS" , abrev : "ESD"},
      { numero: 16, nombre: "Nehemías",img:"NEHEMIAS" , abrev : "NEH"},
      { numero: 17, nombre: "Ester",img:"ESTER" , abrev : "EST"},
      { numero: 18, nombre: "Job",img:"JOB" , abrev : "JOB"},
      { numero: 19, nombre: "Salmos",img:"SALMOS" , abrev : "SALM"},
      { numero: 20, nombre: "Proverbios",img:"PROVERBIOS" , abrev : "PROV"},
      { numero: 21, nombre: "Eclesiastés",img:"ECLESIASTES" , abrev : "ECL"},
      { numero: 22, nombre: "Cantares",img:"CANTARES" , abrev : "CANT"},
      { numero: 23, nombre: "Isaías",img:"ISAIAS" , abrev : "ISAI"},
      { numero: 24, nombre: "Jeremías",img:"JEREMIAS" , abrev : "JERE"},
      { numero: 25, nombre: "Lamentaciones",img:"LAMENTACIONES" , abrev : "LAM"},
      { numero: 26, nombre: "Ezequiel",img:"EZEQUIEL" , abrev : "EZEQ"},
      { numero: 27, nombre: "Daniel",img:"DANIEL" , abrev : "DAN"},
      { numero: 28, nombre: "Oseas",img:"OSEAS" , abrev : "OSE"},
      { numero: 29, nombre: "Joel",img:"JOEL" , abrev : "JOEL"},
      { numero: 30, nombre: "Amós",img:"AMOS" , abrev : "AMOS"},
      { numero: 31, nombre: "Abdías",img:"ABDIAS" , abrev : "ABD"},
      { numero: 32, nombre: "Jonás",img:"JONAS" , abrev : "JON"},
      { numero: 33, nombre: "Miqueas",img:"MIQUEAS" , abrev : "MIQU"},
      { numero: 34, nombre: "Nahúm",img:"NAHUM" , abrev : "NAH"},
      { numero: 35, nombre: "Habacuc",img:"HABACUC" , abrev : "HAB"},
      { numero: 36, nombre: "Sofonías",img:"SOFONIAS" , abrev : "SOF"},
      { numero: 37, nombre: "Hageo",img:"HAGEO" , abrev : "HAG"},
      { numero: 38, nombre: "Zacarías",img:"ZACARIAS" , abrev : "ZAC"},
      { numero: 39, nombre: "Malaquías",img:"MALAQUIAS" , abrev : "MAL"}
    ],
    nuevoTestamento: [
      { numero: 1, nombre: "Mateo",img:"MATEO" , abrev : "MAT"},
      { numero: 2, nombre: "Marcos",img:"MARCOS" , abrev : "MARC"},
      { numero: 3, nombre: "Lucas",img:"LUCAS" , abrev : "LUC"},
      { numero: 4, nombre: "Juan",img:"JUAN" , abrev : "JUAN"},
      { numero: 5, nombre: "Hechos",img:"HECHOS" , abrev : "HECH"},
      { numero: 6, nombre: "Romanos",img:"ROMANOS" , abrev : "ROM"},
      { numero: 7, nombre: "1 Corintios",img:"1CORINTIOS" , abrev : "1COR"},
      { numero: 8, nombre: "2 Corintios",img:"2CORINTIOS" , abrev : "2COR"},
      { numero: 9, nombre: "Gálatas",img:"GALATAS" , abrev : "GAL"},
      { numero: 10, nombre: "Efesios",img:"EFESIOS" , abrev : "EFE"},
      { numero: 11, nombre: "Filipenses",img:"FILIPENSES" , abrev : "FIL"},
      { numero: 12, nombre: "Colosenses",img:"COLOSENSES" , abrev : "COL"},
      { numero: 13, nombre: "1 Tesalonicenses",img:"1TESALONISENSES" , abrev : "1 TES"},
      { numero: 14, nombre: "2 Tesalonicenses",img:"2TESALONISENSES" , abrev : "2 TES"},
      { numero: 15, nombre: "1 Timoteo",img:"1TIMOTEO" , abrev : "1 TIM"},
      { numero: 16, nombre: "2 Timoteo",img:"2TIMOTEO" , abrev : "2 TIM"},
      { numero: 17, nombre: "Tito",img:"TITO" , abrev : "TITO"},
      { numero: 18, nombre: "Filemón",img:"FILEMON" , abrev : "FIL"},
      { numero: 19, nombre: "Hebreos",img:"HEBREOS" , abrev : "HEB"},
      { numero: 20, nombre: "Santiago",img:"SANTIAGO" , abrev : "SANT"},
      { numero: 21, nombre: "1 Pedro",img:"1PEDRO" , abrev : "1 PED"},
      { numero: 22, nombre: "2 Pedro",img:"2PEDRO" , abrev : "2 PED"},
      { numero: 23, nombre: "1 Juan",img:"1JUAN" , abrev : "1 JUAN"},
      { numero: 24, nombre: "2 Juan",img:"2JUAN" , abrev : "2 JUAN"},
      { numero: 25, nombre: "3 Juan",img:"3JUAN" , abrev : "3 JUAN"},
      { numero: 26, nombre: "Judas",img:"JUDAS" , abrev : "JUD"},
      { numero: 27, nombre: "Apocalipsis",img:"APOCALIPSIS" , abrev : "APOC"}
    ]
  };

}
