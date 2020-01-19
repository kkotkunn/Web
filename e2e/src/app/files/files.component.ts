import { Component, ViewChild, OnInit } from '@angular/core';
import { Http, RequestOptions, Headers, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FileSaverModule, FileSaverService } from 'ngx-filesaver';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})
export class FilesComponent implements OnInit {
  downloadFiles: Object;

  constructor(private http: Http, private router: Router, private _FileSaverService: FileSaverService, public _http: HttpClient) {
    this.errorMessage = "";
    this.filesToUpload = [];
    this.selectedFileNames = [];
    this.uploadResult = "";
}

  ngOnInit() {
    this.getAllFiles();
  }

  errorMessage: string;
    filesToUpload: Array<File>;
    selectedFileNames: string[] = [];
    public isLoadingData: Boolean = false;
    uploadResult: any;
    res: Array<string>;
    myAppUrl: string = "https://localhost:44393/";
    afuConfig: any = null;

    fileChangeEvent(fileInput: any)
    {
        this.uploadResult = "";
        this.filesToUpload = <Array<File>>fileInput.target.files;

        for (let i = 0; i < this.filesToUpload.length; i++)
        {
            this.selectedFileNames.push(this.filesToUpload[i].name);
        }
    }

    cancelUpload()
    {
        this.filesToUpload = [];
        this.selectedFileNames = [];
        this.uploadResult = "";
        this.errorMessage = "";
    }

    upload()
    {
        if (this.filesToUpload.length == 0)
        {
            alert('Please select at least 1 files to upload!');
        }
        else if (this.filesToUpload.length > 3) {
            alert('Please select a maximum of 3 files to upload!');
        }
        else
        {
            this.uploadFiles();
        }
    }

    uploadFiles()
    {
        this.uploadResult = "";

        if (this.filesToUpload.length > 0)
        {
            this.isLoadingData = true;

            let formData: FormData = new FormData();

            for (var i = 0; i < this.filesToUpload.length; i++)
            {
                formData.append('uploadedFiles', this.filesToUpload[i], this.filesToUpload[i].name);
            }

            let apiUrl = "https://localhost:44393/api/Upload";

            this.http.post(apiUrl, formData)
                .subscribe
                (
                    data => {
                        this.uploadResult = data;
                        this.errorMessage = "";
                        this.uploadResult = this.getAllFiles();  
                    },
                    err => {
                        console.error(err);
                        this.errorMessage = err;
                        this.isLoadingData = false;
                    },
                    () => {
                        this.isLoadingData = false,
                        this.selectedFileNames = [];
                        this.filesToUpload = [];
                    }
                );
        }
        this.cancelUpload();
        this.cancelUpload();

    }

    downloadFile(filename: string) {
        this._http.get(this.myAppUrl + "api/DownloadFile?fileName=" + filename,
          {
             responseType: 'blob'
           })
          .subscribe(res => {
            console.log(res);
            var blob = new Blob([res], { type: "application/octet-stream" });
            this._FileSaverService.save(blob, filename);
           },
             (error) => {
               console.log(error);
             },
             () => console.info("OK")
         );
         return false;
       }

       getAllFiles() {
         this._http.get("https://localhost:44393/api/Download/GetFiles").subscribe(res => {
           console.log(res);
           this.downloadFiles = res;
         },
           error => console.log(error)
         )
       }

}