import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Md5} from 'ts-md5';
import { from } from 'rxjs';
import {exhaustMap, tap} from 'rxjs/operators';
import { Game } from './models';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private firestore: AngularFirestore,
  ) { }
  public generateCodes() {
    const seed = Math.random();
    const md5 = new Md5();
    const xKeyMd5 = md5.appendStr(seed.toString()).end();
    const dotKeyMd5 = md5.appendStr((seed + 1).toString()).end();
    return from(
      this.firestore.collection('games').add({
        game: {
          dotKey: dotKeyMd5,
          xKey: xKeyMd5,
          grid: '',
          state: '',
        }
      }));
  }

  public getPlayerKeys(gameKey: string) {
    return from(
      this.firestore.collection(`games`).doc(gameKey).snapshotChanges()
    );
  }
  public putGridAndEndMove(gameKey: string, gameState: Game, stateToSave: string) {
    // console.log(gameKey, stateToSave);
    return from(this.firestore.collection('games').doc(gameKey).update({
      game: gameState
    }));
  }
  public listenToUpdates(gameKey: string) {
    return this.firestore.collection('games').doc(gameKey).valueChanges().pipe(tap(r => console.log(r)));
  }
}

export interface IPayload {
  game: {
    dotKey: string;
    xKey: string;
  };
}
