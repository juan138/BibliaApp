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
    this.chaperRead = Number(chaper);
    this.searchTextChaper();
  }

  bookName:any; 
  chaperRead:any;
  listChapers:any=[];
  listVersiculos:any=[];
  totalChapers:number=1;

  showNext:boolean=true;
  showPrev:boolean=false;

  async loadTotalChapers(name_book:any){

    await this.bd_bible.checkDatabaseExists();
    
    await this.bd_bible.getUniqueChaptersByBook(name_book).then(resp=>{
      this.totalChapers = <any> resp;
      for(let i=1 ; i<=this.totalChapers ; i++){
        this.listChapers.push({
          "book":name_book + " "+ i,
          "chaper":i
        })
      }
    })
  }

  async searchTextChaper(){

    this.showNext=(this.chaperRead < this.totalChapers);
    this.showPrev=(this.chaperRead>1);

    await this.bd_bible.checkDatabaseExists();
    await this.bd_bible.getVersesByBookAndChapter(this.bookName,this.chaperRead).then(resp=>{
      this.listVersiculos=[];
        console.log(resp);
        this.listVersiculos=resp;
    }) 
  }

  async nextChaper(){
    if(this.chaperRead < this.totalChapers){
      this.chaperRead++;
      this.showNext=(this.chaperRead < this.totalChapers);
      this.showPrev=(this.chaperRead>1);
      await this.bd_bible.checkDatabaseExists();
      await this.bd_bible.getVersesByBookAndChapter(this.bookName,this.chaperRead).then(resp=>{
        this.listVersiculos=[];
          console.log(resp);
          this.listVersiculos=resp;
      }) 
    }else{
      this.showNext=false;
    }
  }

  async prevChaper(){
    if(this.chaperRead > 1){
      this.chaperRead--;
      this.showPrev=true;
      this.showNext=(this.chaperRead < this.totalChapers);
      if(this.chaperRead==1){
        this.showPrev=false;
      }
      await this.bd_bible.checkDatabaseExists();
      await this.bd_bible.getVersesByBookAndChapter(this.bookName,this.chaperRead).then(resp=>{
        this.listVersiculos=[];
          console.log(resp);
          this.listVersiculos=resp;
      }) 
    }else{
      this.showPrev=false;
    }
  }

  parseNumber(val:any){
    return Number(val);
  }

}
