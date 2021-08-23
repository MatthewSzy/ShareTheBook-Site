import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const RELATIVE_LINK = 'http://localhost:8080/users/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
      return this.http.post(RELATIVE_LINK + 'login', {
        username,
        password
      }, httpOptions);
  }

  registration(username: string, password: string, role: string[]): Observable<any> {
      return this.http.post(RELATIVE_LINK + 'registration', {
          username,
          password,
          role
      }, httpOptions);
  }

  update(id: string, username: string, password: string): Observable<any> {
    return this.http.put(RELATIVE_LINK + `update/${id}`, {
      username,
      password
    }, httpOptions);
  }

  upload(id: string, file: File): Observable<any> {
    const fileData = new FormData();
    fileData.append('image', file, file.name);

    return this.http.put(RELATIVE_LINK + `upload/${id}`, fileData);
  }

  getProfileImage(id: string): Observable<any> {
    return this.http.get(RELATIVE_LINK + `profileImage/${id}`);
  }

  getUsersList(): Observable<any> {
    return this.http.get(RELATIVE_LINK + 'usersList', httpOptions);
  }

  changeRole(id: string, type: string): Observable<any> {
    console.log(type);
    return this.http.put(RELATIVE_LINK + `changeRole/${id}`, {
      type
    }, httpOptions);
  }
}