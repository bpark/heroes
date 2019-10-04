import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _attrs = {
    'width': '100',
    'height': '100'
  };


  constructor() { }

  ngOnInit() {
  }

}
