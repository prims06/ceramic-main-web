import { Component, OnInit } from '@angular/core';
import { QrService } from 'src/app/core/services/qr.service';

@Component({
  selector: 'app-seach-code',
  templateUrl: './seach-code.component.html',
  styleUrls: ['./seach-code.component.scss']
})
export class SeachCodeComponent implements OnInit {

  constructor(private Qr:QrService) { }

   onSearch:boolean
  datas : any[]
  code:string

  

  ngOnInit(): void {
    this.onSearch = false
    this.datas = []
  }

  public getCodeDetail(){
    this.datas = []
    this.onSearch = true
    this.Qr.findCode(this.code).subscribe({
      next:(data)=>{
        this.datas = data
        console.log(data)
      }
    })
    this.code = '';
    if(this.datas[0]==null){
      setTimeout(()=>{
        this.onSearch = false
      }, 10000)
    }
  }

}
