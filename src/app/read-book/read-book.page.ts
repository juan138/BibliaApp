import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.page.html',
  styleUrls: ['./read-book.page.scss'],
  standalone: false,
})
export class ReadBookPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nameBook:string="Genesis"

}
