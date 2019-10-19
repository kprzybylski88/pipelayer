import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {Md5} from 'ts-md5';
import { from } from 'rxjs';

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
    const exKeyMd5 = md5.appendStr(seed.toString()).end();
    const dotKeyMd5 = md5.appendStr((seed + 1).toString()).end();
    return from(
      this.firestore.collection('games').add({
        game: {
          dotKey: dotKeyMd5,
          exKey: exKeyMd5
        }
      }));
  }

  public getPlayerKeys(gameKey: string) {
    return from(
      this.firestore.collection(`games`).doc(gameKey).snapshotChanges()
    );
  }
}
