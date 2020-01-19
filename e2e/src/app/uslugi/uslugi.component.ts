import { Component, OnInit } from '@angular/core';
import { UslugisService } from './uslugi.service';
import { Uslugi } from '../shared/uslugi.model';
import { ToastrService } from 'ngx-toastr';

interface ArrayOfUslugi {
  UslugiId: number;
  UslugiName: string;
  DoktorName: string;
  Cost: number;
  Price: number;
}
@Component({
  selector: 'app-uslugi',
  templateUrl: './uslugi.component.html',
  styleUrls: ['./uslugi.component.less']
})

export class UslugiComponent implements OnInit{
  UslugiName: string = ' ';
  DoktorName: string = ' ';
  Cost: number = 0;

  arrayOfUslugi: ArrayOfUslugi[] = [];
  constructor(private uslugisService: UslugisService, private toastr: ToastrService) {
    // this.LoadUslugis();
    this.ws.onopen = () => {
      this.setStatus('ONLINE');
      this.LoadUslugis();
      this.ws.onmessage = (response) => {
        this.toastr.success(response.data);
        this.printMessage(response.data);  
      };
    };
    this.uslugisService.ngOnInit();

  }
  
  private sub = document.getElementById('submit');
  private ws = new WebSocket('ws://localhost:3000');
  uslugis:Uslugi[];
  text: string;
  setStatus(value) {
    console.log(value)
  }
  printMessage(value) {
    this.toastr.success('Hello!'); 
    console.log(value);
  }
  SendMessage() {   
    console.log("Take this message from me!");
    this.ws.send('isUpgrade');   
    
  }
  LoadUslugis() {
    this.uslugisService.getUslugis().subscribe((arrayOfUslugi: ArrayOfUslugi[]) => {
      this.arrayOfUslugi = arrayOfUslugi;
      console.log(this.arrayOfUslugi);
    });
  }
  ngOnInit() {
    var te = new TextEncoder();
  }

  addUslugi() {
    this.uslugisService.addUslugi(this.DoktorName, this.UslugiName, this.Cost)
      .subscribe((arrayOfUslugi: ArrayOfUslugi[]) => {
        this.LoadUslugis();
      }),
    this.UslugiName = '';
    this.DoktorName = '';
    this.Cost = 0;
    this.LoadUslugis();
    this.SendMessage();
  }
  setNewYear(uslugis: ArrayOfUslugi) {
    console.log("compon change")
    this.UslugiName = uslugis.UslugiName;
    this.DoktorName = uslugis.DoktorName;
    this.Cost = uslugis.Cost;    
  }

  setNewUslugi(uslugis : ArrayOfUslugi){
    console.log("compon setNewUslugi")
    uslugis.DoktorName = this.DoktorName;
    uslugis.UslugiName = this.UslugiName;
    uslugis.Cost = this.Cost;
    this.uslugisService.changeUslugi(uslugis).subscribe(data=>console.log(data))

  }

  delUslugi(UslugiId: number) {
    console.log("compon delete");
    this.uslugisService.delUslugi(UslugiId).subscribe(data=>this.LoadUslugis());  
  }

  getResult(text: string) {
    if(text == "") this.uslugisService.getUslugis().subscribe((arrayOfUslugi: ArrayOfUslugi[]) => {
      this.arrayOfUslugi = arrayOfUslugi;
      console.log(this.arrayOfUslugi);
    });
    else this.uslugisService.getResult(text).subscribe((arrayOfUslugi: ArrayOfUslugi[]) => {
      this.arrayOfUslugi = arrayOfUslugi;
      console.log(this.arrayOfUslugi);
    });
    
  }
  
}
