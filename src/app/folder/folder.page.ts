import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { AppModule } from '../app.module';
import { BibliesSqliteService } from '../services/biblies-sqlite.service';

register();
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: false,
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  constructor(public app : AppModule,
    public bd_bible : BibliesSqliteService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }


  showBooks:boolean=true;
  searchText: string = '';
  listVersiculos:any=[];

onSearchInput(event: any) {
  this.searchText = event.target.value;
  console.log('Digitando:', this.searchText);
}

// buscar texto en versiculos
onSearchSubmit() {
  console.log('Buscar:', this.searchText);
  this.showBooks=false;
  // Aquí puedes ejecutar la búsqueda
  this.bd_bible.getCoincidencias(this.searchText).then(resp=>{
    this.listVersiculos=[];
    console.log(resp);
    this.listVersiculos=resp;
  })
}

onSearchClear() {
  console.log('Busqueda limpiada');
  this.searchText = '';
  this.listVersiculos=[];
  this.showBooks=true;
}

}
