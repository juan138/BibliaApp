import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliesSqliteService } from '../services/biblies-sqlite.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
  standalone: false,
})
export class ReadBookPage implements OnInit {

  constructor( public active: ActivatedRoute,
    public bd_bible : BibliesSqliteService
  ) {
   }

  async ngOnInit() {
    this.bookName = this.active.snapshot.paramMap.get('book');
    console.log(this.bookName)
    await this.loadTotalChapers(this.bookName);
    let chaper = this.active.snapshot.paramMap.get('chaper');
    this.chaperRead = chaper;
    this.searchTextChaper();
  }

  bookName:any;
  chaperRead:any;
  listChapers:any=[];
  listVersiculos:any=[];

  async loadTotalChapers(name_book:any){

    await this.bd_bible.checkDatabaseExists();
    
    await this.bd_bible.getUniqueChaptersByBook(name_book).then(resp=>{
      let total = <any> resp;
      for(let i=1 ; i<=total ; i++){
        this.listChapers.push({
          "book":name_book + " "+ i,
          "chaper":i
        })
      }
    })
  }

  async searchTextChaper(){
    await this.bd_bible.checkDatabaseExists();
    await this.bd_bible.getVersesByBookAndChapter(this.bookName,this.chaperRead).then(resp=>{
      this.listVersiculos=[];
        console.log(resp);
        this.listVersiculos=resp;
    }) 
  }

}
