import { BehaviorSubject } from 'rxjs';

export const beingChecked: BehaviorSubject<{x: number, y: number}> = new BehaviorSubject(null);
export class WinChecker {
  private win = false;
  private branch = [];
  private vertical: boolean;
  private pointType: string;
  constructor(
    private initialPoints,
    private grid,
    private fieldType,
    private winNumber) {
      this.vertical = this.fieldType === 'xFilled';
      this.pointType = this.fieldType === 'xFilled' ? 'xPoint' : 'dotPoint';
  }
  public checkWin() {
    return this.traverse(this.initialPoints);
  }

  private traverse(points) {
    for (const point of points) {
      if (point.type !== this.pointType) {
        continue;
      }
      // debugger;
      beingChecked.next({x: point.x, y: point.y});
      if (this.vertical && point.x === this.winNumber || this.win) {
        this.win = true;
        return true;
      } else if (point.y === this.winNumber || this.win) {
        this.win = true;
        return true;
      }
      this.branch.push(point);
      point.traversed = true;
      const conns = this.findConnections(point);
      // console.log(conns, point);
      if (conns.length) {
        this.traverse(conns);
      } else {
        this.branch.pop();
        if (this.branch.length) {
          this.traverse(this.findConnections(this.branch[this.branch.length - 1]));
        }
      }
    }
    return this.win;
  }

  private findConnections(point) {
    const connections = [];
    if (this.grid[point.y][point.x - 2]
     && this.grid[point.y][point.x - 1]
     && this.grid[point.y][point.x - 1].type === this.fieldType
     && !this.grid[point.y][point.x - 2].traversed) {
      connections.push(this.grid[point.y][point.x - 2]);
    }
    if (this.grid[point.y][point.x + 2]
     && this.grid[point.y][point.x + 1]
     && this.grid[point.y][point.x + 1].type === this.fieldType
     && !this.grid[point.y][point.x + 2].traversed) {
      connections.push(this.grid[point.y][point.x + 2]);
    }
    if (this.grid[point.y - 2]
    && this.grid[point.y - 1][point.x]
    && this.grid[point.y - 1][point.x].type === this.fieldType
    && !this.grid[point.y - 2][point.x].traversed) {
      connections.push(this.grid[point.y - 2][point.x]);
    }
    if (this.grid[point.y + 2]
     && this.grid[point.y + 1][point.x]
     && this.grid[point.y + 1][point.x].type === this.fieldType
     && !this.grid[point.y + 2][point.x].traversed) {
      connections.push(this.grid[point.y + 2][point.x]);
    }
    // console.log(connections);
    return connections;
  }

}
