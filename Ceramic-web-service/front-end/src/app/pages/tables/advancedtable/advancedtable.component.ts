import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { Observable } from 'rxjs';

import { Table } from './advanced.model';
import { Router } from '@angular/router';
import { tableData } from './data';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { AdvancedService } from './advanced.service';
import { AdvancedSortableDirective, SortEvent } from './advanced-sortable.directive';

@Component({
  selector: 'app-advancedtable',
  templateUrl: './advancedtable.component.html',
  styleUrls: ['./advancedtable.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})

/**
 * Advanced table component
 */
export class AdvancedtableComponent implements OnInit {
  // bread crum data
  breadCrumbItems: Array<{}>;
  hideme: boolean[] = [];

  // Table data
  tableData: Table[]=[];

  tables$: Observable<Table[]>;
  tables: Table[];
  total$: Observable<number>;
  errorMsg:string;
  vide:boolean ;

  @ViewChildren(AdvancedSortableDirective) headers: QueryList<AdvancedSortableDirective>;

  constructor(public service: AdvancedService, private router: Router) {
    this.tables$ = service.tables$;
    console.log(this.tables$);
    
    if(this.tables$[0] == undefined){
this.vide  = true;


    }else{
      this.vide  = false;
    }
    console.log(this.vide);
    console.log(this.tables$[0]);
    
    // this.tables = service.tables$;
    this.total$ = service.total$;
    // this.service.fetchAll().subscribe({
    //   next: tableData => {
    //     this.tableData = tableData;
    //     // this.filteredHotels = this.hotels;
    //   },
    //   error: err => this.errorMsg = err
    // });
    // console.log("Tableau "+this.tableData);
    
      }

  ngOnInit() {

    this.breadCrumbItems = [{ label: 'Comptes' }, { label: 'Utilisateurs', active: true }];

    /**
     * fetch data
     */
    // this._fetchData();
  }


  changeValue(i) {
    this.hideme[i] = !this.hideme[i];
  }

  /**
   * fetches the table value
   */
  _fetchData() {
    this.tableData = tableData;
    for (let i = 0; i <= this.tableData.length; i++) {
      this.hideme.push(true);
    }
  }

  /**
   * Sort table data
   * @param param0 sort the column
   *
   */
  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
// public showBadge : boolean = true
// public toggleIsNewBadge(): void {
//     this.showBadge = !this.showBadge;
//   }
public  validate(id: number, event?: any){
// let ress = false
    this.service.updateValidate({
      idUser : id
    })
    .subscribe(
      res => {
        console.log(res);
        // this.action(event)
        // this.clicked[id] = true
        // ress = true
        event.target.disabled = true;
      },
      err => {
        console.log(err);
      });
    // this.service.updateValidate().subscribe
    // return ress
  }

  navigateToAbout(id) {
    this.router.navigate(['/scan-detail/'+id]);
  }


}
