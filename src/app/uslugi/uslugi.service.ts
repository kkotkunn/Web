import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
@Injectable()

export class UslugisService { 
    constructor (private http: HttpClient){} 
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