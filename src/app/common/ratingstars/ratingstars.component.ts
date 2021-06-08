import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ratingstars',
  templateUrl: './ratingstars.component.html',
  styleUrls: ['./ratingstars.component.scss']
})
export class RatingstarsComponent implements OnInit {

  @Input() rating: number;

  constructor() { }

  ngOnInit() {
    if (this.rating === undefined) {
      this.rating = 0;
    }
  }

}
