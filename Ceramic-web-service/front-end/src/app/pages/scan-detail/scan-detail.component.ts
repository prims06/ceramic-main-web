import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrService } from 'src/app/core/services/qr.service';

@Component({
  selector: 'app-scan-detail',
  templateUrl: './scan-detail.component.html',
  styleUrls: ['./scan-detail.component.scss']
})
export class ScanDetailComponent implements OnInit {
  public scanDetails : any[]
  constructor(private route: ActivatedRoute, private Qr : QrService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('userId');
      this.Qr.getScanDetail(id).subscribe({
        next: (data) => {
          this.scanDetails = data;
        },
      })
    });
  }

}
