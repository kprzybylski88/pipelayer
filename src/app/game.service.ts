import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WinChecker, beingChecked } from './win-checker.class';

export interface Tile {
  type: TileType;
  mark: string;
  beingChecked?: boolean;
}

export enum TileType {
  off = 'off',
  empty = 'empty',
  xPoint = 'xPoint',
  dotPoint = 'dotPoint',
  xFilled = 'xFilled',
  dotFilled = 'dotFilled',
}

enum GameState {
  dot = 'dot',
  x = 'x',
  win = 'win'
}

enum Connection {
  left = 'left',
  right = 'right',
  up = 'up',
  down = 'down',
}

interface Node {
  x: number;
  y: number;
  connections: Point[];
  traversed?: boolean;
}

interface Point {
  x: number;
  y: number;
}
@Injectable({
  providedIn: 'root'
})
export class GameService {
  public dim = 10;
  public realDim = (this.dim * 2) - 1;
  public tileArr: Array<Array<Tile>> = [];
  public tileArr$ = new BehaviorSubject<any>(null);
  public gameState: GameState = GameState.dot;

  constructor() {
    beingChecked.subscribe({
      next: r => {
        if (r) {
          this.tileArr[r.y][r.x].beingChecked = true;
          setTimeout(() => {
            this.tileArr[r.y][r.x].beingChecked = false;
          }, 2000);
        }
      }
    });
    for (let i = 0; i < this.realDim; ++i) {
      const row: Tile[] = [];
      for (let j = 0; j < this.realDim; ++j) {
        let tileType: TileType;
        let markType: string;
        switch (true) {
          case (j % 2 === 1 && i % 2 === 0):
            tileType = TileType.dotPoint;
            markType = '●';
            break;
          case (j % 2 === 0 && i % 2 === 1):
            tileType = TileType.xPoint;
            markType = 'X';
            break;
          default:
            tileType = TileType.empty;
            markType = ' ';
        }
        row.push({type: tileType, mark: markType});
      }
      this.tileArr.push(row);
    }
    this.tileArr$.next(this.tileArr);
  }
  tileClicked(i: number, j: number) {
    const metric = new Date().getTime();
    if (this.tileArr[i][j].type !== TileType.empty ) {
      return;
    }
    if (this.gameState === GameState.win) {
      return;
    }
    const fieldTypeToFill = this.gameState === GameState.dot ? TileType.dotFilled : TileType.xFilled;
    const fieldToCheck = this.gameState === GameState.dot ? TileType.dotPoint : TileType.xPoint;
    if (this.fillField(i, j, fieldToCheck)) {
      this.tileArr[i][j].mark = this.fillField(i, j, fieldToCheck);
      this.tileArr[i][j].type = fieldTypeToFill;
      if (this.checkForWin(fieldTypeToFill)) {
        this.gameState = GameState.win;
        alert('Victory ' + fieldTypeToFill);
        return;
      }
      this.gameState = this.gameState === GameState.dot ? GameState.x : GameState.dot;
      this.tileArr$.next(this.tileArr);
    }
    console.log(new Date().getTime() - metric);
  }

  private fillField(i: number, j: number, tileType: TileType) {
    if (this.tileArr[i - 1] && this.tileArr[i + 1]
     && this.tileArr[i - 1][j].type === tileType
     && this.tileArr[i + 1][j].type === tileType) {
       return '|';
    } else if (this.tileArr[i][j - 1] && this.tileArr[i][j + 1]
            && this.tileArr[i][j - 1].type === tileType
            && this.tileArr[i][j + 1].type === tileType) {
      return '—';
    }
    return null;
  }

  private checkForWin(filedType: TileType) {
    const pointTile = filedType === TileType.dotFilled ? TileType.dotPoint : TileType.xPoint;
    const winGrid = this.tileArr.map( (l0, i) => {
      return l0.map((l1, j) => {
        return {type: l1.type, x: j, y: i, traversed: false};
      });
    });
    const initialPoints = filedType === TileType.dotFilled ? winGrid[0] : winGrid.map(t => t[0]);
    const winChecker = new WinChecker(initialPoints, winGrid, filedType, this.realDim  - 1);
    return winChecker.checkWin();
  }
}
