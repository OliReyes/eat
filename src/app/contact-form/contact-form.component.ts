import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Output() saved = new EventEmitter<string>();
  @Output() finished = new EventEmitter<string>();

  showSend = false;


  constructor() { }

  ngOnInit(): void {

    setTimeout(() => {

      this.showSend = true;
      
    }, 4000);

  }

  @Input() prime: number;

  templateForm(form){
    form.prime = this.prime;
    
    this.saveData(form);

  }

  saveData(form){

    if (typeof(Storage) !== 'undefined') {
      
      let answers = JSON.parse(sessionStorage.getItem('answers'));

      if(answers.length < 1){
        answers.push(form);
        sessionStorage.setItem('answers', JSON.stringify(answers) );
        this.restart();
       
      } else {

        this.finish();

      }

      

      

    } else {
     // Código cuando Storage NO es compatible
    }

  }

  restart() {
    this.saved.emit();
  }

  finish() {
    this.finished.emit();
  }

}
