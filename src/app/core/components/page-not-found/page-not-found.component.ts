import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  constructor(private location: Location) { }

  /** to go back to the previous page */
  goBack() {
    this.location.back();
  }
}
