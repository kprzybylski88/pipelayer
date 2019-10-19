import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService, IPayload } from '../data.service';
import { FormControl } from '@angular/forms';
import { GameService } from '../game.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public playerKeyControl = new FormControl();
  public gameKey: string;
  public playerKeys: {dotKey: string, xKey: string} = {
    dotKey: '',
    xKey: ''
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameKey = this.activatedRoute.snapshot.params.gameKey ? this.activatedRoute.snapshot.params.gameKey : null;
    if (this.gameKey) {
      this.dataService.getPlayerKeys(this.gameKey).pipe(take(1)).subscribe(r => {
        this.playerKeys = (r.payload.data() as IPayload).game;
      });
    }
  }

  authorize() {
    const key = this.playerKeyControl.value;
    if (key === this.playerKeys.dotKey) {
      console.log('You are a dot');
      this.gameService.playerMark = 'dot';
    } else if (key === this.playerKeys.xKey) {
      this.gameService.playerMark = 'x';
      console.log('You are an X');
    } else {
      console.log('You are a nobody...');
      return;
    }
    this.gameService.gameKey = this.gameKey;
    this.gameService.playerKey = key;
    this.gameService.gameObject = {
      dotKey: this.playerKeys.dotKey,
      xKey: this.playerKeys.xKey,
      state: null,
      grid: null,
    };
    this.gameService.startSubscription(this.gameKey);
    this.router.navigate(['/game'], {queryParams: {
      gameKey: this.gameKey,
      playerKey: key
    }});
  }

}
