import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'eat-test';
  start = false;
  prime = false;
  number = 1;
  target = false;
  form = false;
  finish = false;
  answers = [];
  usuario = 0;

  primes = {

    'one': 0,
    'two': 0,
    'three': 0,
    'four': 0,
    'five': 0,

  }

  ngOnInit(): void{

    sessionStorage.setItem('answers', '[]');

  }

  exportExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('results');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'eat-test.xlsx');
 
  }

  onContinue(){
    this.start = true;

    setTimeout(()=>{ 
      this.start = false;
      this.showPrime();
    }, 1000);
  }

  showPrime(){

    this.calcNumber();

    this.prime = true;

    setTimeout(()=>{ 
      this.prime = false;

      this.triggerTarget();

    }, 2000);

  }

  triggerTarget(){

    this.target = true;
    this.form = true;

    setTimeout(()=>{ 
      this.target = false;
    }, 4000);

  }

  calcNumber(){

    this.number = Math.floor(Math.random() * 5) + 1;

    if( this.number === 1 ){

      this.primes.one >= 5 ? this.calcNumber() : this.primes.one++;
      return;

    } else if ( this.number === 2 ){

      this.primes.two >= 5 ? this.calcNumber() : this.primes.two++;
      return;

    } else if ( this.number === 3 ){

      this.primes.three >= 5 ? this.calcNumber() : this.primes.three++;
      return;

    } else if ( this.number === 4 ){

      this.primes.four >= 5 ? this.calcNumber() : this.primes.four++;
      return;

    } else if ( this.number === 5 ){

      this.primes.five >= 5 ? this.calcNumber() : this.primes.five++;
      return;

    }

    return this.number;

  }

  restart(){

    this.start = false;
    this.prime = false;
    this.target = false;
    this.form = false;

    this.onContinue();

  }

  onFinish(){

    this.answers = JSON.parse(sessionStorage.getItem('answers'));

    this.start = false;
    this.prime = false;
    this.target = false;
    this.form = false;
    this.finish = true;

  }

}
