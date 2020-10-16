import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    apiBaseUrl = environment.baseApiUrl;

    constructor(
        private http: HttpClient
    ) {
        
    }

    uploadFile = (fd: FormData): Observable<any> => {
        return this.http.post<any>(this.apiBaseUrl + '/upload-file', fd);
    }

    searchForKey = (data: any): Observable<any> => {
        return this.http.post<any>(this.apiBaseUrl + '/search', data);
    }

}