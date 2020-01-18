import { Component, OnInit } from '@angular/core';
import { UslugisService } from './uslugi.service';
import { Uslugi } from '../shared/book.model';

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
export class UslugiComponent {
  UslugiName: string = ' ';
  DoktorName: string = ' ';
  Cost: number = 0;

  arrayOfUslugi: ArrayOfUslugi[] = [];
  constructor(private uslugisService: UslugisService) {
    this.LoadUslugis();
  }
  uslugis:Uslugi[];
  text: string;
  LoadUslugis() {
    this.uslugisService.getUslugis().subscribe((arrayOfUslugi: ArrayOfUslugi[]) => {
      this.arrayOfUslugi = arrayOfUslugi;
      console.log(this.arrayOfUslugi);
    });
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
