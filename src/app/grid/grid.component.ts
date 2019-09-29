import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  public tileArr = [];
  constructor(private gameService: GameService) {
    this.tileArr = this.gameService.tileArr;
  }

  ngOnInit() {
  }

  tileClicked(i: number, j: number) {
    this.gameService.tileClicked(i, j);
  }

}
