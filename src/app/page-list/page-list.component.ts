import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  sidebarOpen:boolean;
  constructor() { }

  ngOnInit(): void {
  }


  closeSidebar(){
    this.sidebarOpen = false;
    console.log(this.sidebarOpen , 'closeSidebar');
  }
}
