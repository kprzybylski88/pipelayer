import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from '../game.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, OnDestroy {
  public player: string;
  public state: string;
  private stateSub: Subscription;
  private gridSub: Subscription;
  public tileArr = [];
  constructor(
    private gameService: GameService,
    private activatedRoute: ActivatedRoute,
    ) {
    this.tileArr = this.gameService.tileArr;
  }

  ngOnInit() {
    this.player = this.gameService.playerMark ? this.gameService.playerMark : 'Spectator';
    this.stateSub = this.gameService.gameState$.subscribe({
      next: state => this.state = state
    });
    this.gridSub = this.gameService.tileArr$.subscribe(r => this.tileArr = this.gameService.tileArr);
  }

  ngOnDestroy() {
    this.stateSub.unsubscribe();
    this.gridSub.unsubscribe();
  }

  tileClicked(i: number, j: number) {
    this.gameService.tileClicked(i, j);
  }

}
