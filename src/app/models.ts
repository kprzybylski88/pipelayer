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

export enum GameState {
  dot = 'dot',
  x = 'x',
  win = 'win'
}

export interface Game {
  xKey: string;
  dotKey: string;
  grid: string;
  state: GameState;
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
