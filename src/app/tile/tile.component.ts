import { Component, OnInit, Input } from '@angular/core';
import { Tile } from '../models';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {

  @Input() public tile: Tile;
  constructor() {
  }

  ngOnInit() {
    // console.log(this.tileType);
  }

}
