import { Component, OnInit } from '@angular/core';
import { DataService, IPayload } from '../data.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  gameUrl: string;

  keys = {
    exKey: '',
    dotKey: ''
  };

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }
  generateCodes() {
    this.dataService.generateCodes().subscribe({
      next: r => {
        this.gameUrl = `${environment.appUrl}login/${r.id}`;
        this.dataService.getPlayerKeys(r.id).subscribe(rr => this.keys = (rr.payload.data() as IPayload).game);
      }
    });
  }
}
