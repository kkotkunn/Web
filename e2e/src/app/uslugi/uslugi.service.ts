import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable()

export class UslugisService implements OnInit { 
    constructor (private http: HttpClient, private toastr: ToastrService){} 
    ngOnInit() {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const data: any = {
        'url': 'ws://localhost:3000'
        };
        this.http.post("http://localhost:3200/subscribe", <JSON>data, httpOptions).subscribe(data => {
        console.log(data);
        });
  
        }
    
    getUslugis(){ 
        return this.http.get('https://localhost:44393/api/uslugi'); 
    }
    addUslugi( DoktorName:string, UslugiName:string, Cost: number){
        const data ={
            DoktorName: DoktorName,
            UslugiName : UslugiName,
            Cost: Cost
        }
        return this.http.post('https://localhost:44393/api/uslugi', (data));
    }
    changeUslugi(uslugis : any){     
        console.log('service change', uslugis.UslugiId);
        let url=`https://localhost:44393/api/uslugi/${uslugis.UslugiId}`;
        let prom = this.http.put(url, uslugis)
        console.log(prom);
        return prom;
    }
    delUslugi(UslugiId : number){
        console.log('service delete', UslugiId);
        let url=`https://localhost:44393/api/uslugi/${UslugiId}`;
        let prom =  this.http.delete(url);
        console.log(prom);
        return prom;
    }

    getResult(text: string): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
        const data: any = {
        "text": text
        };
        return this.http.post(`https://localhost:44393/api/Search/?text=` + text, <JSON>data, httpOptions)
      }

}