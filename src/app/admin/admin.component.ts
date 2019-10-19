import { Component, OnInit } from '@angular/core';
import { DataService, IPayload } from '../data.service';
import { environment } from '../../environments/environment';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  gameUrl: string;

  keys: {dotKey: string, xKey: string} = {
    xKey: '',
    dotKey: ''
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }
  generateCodes() {
    this.dataService.generateCodes().pipe(take(1)).subscribe({
      next: r => {
        this.gameUrl = `${environment.appUrl}login/${r.id}`;
        this.dataService.getPlayerKeys(r.id).pipe(take(1)).subscribe(rr => this.keys = (rr.payload.data() as IPayload).game);
      }
    });
  }
}
