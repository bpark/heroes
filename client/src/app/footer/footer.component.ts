import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private _attrs = {
    'width': '5rem',
    'height': '5rem'
  };


  constructor() { }

  ngOnInit() {
  }

}
