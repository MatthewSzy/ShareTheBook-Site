import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const RELATIVE_LINK = 'http://localhost:8080/books/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BookService {

    constructor(private http: HttpClient) { } 

    addBook(title: string, author: string, releaseDate: string, description: string, categories: string[]): Observable<any> {
        return this.http.post(RELATIVE_LINK + "addData", {
            title,
            author,
            releaseDate,
            description,
            categories
        }, httpOptions);
    }
    
    addFile(id: string, coverImage: File, bookFile: File): Observable<any> {
        const formData = new FormData();
        formData.append('files', coverImage, coverImage.name);
        formData.append('files', bookFile, bookFile.name);

        return this.http.put(RELATIVE_LINK + `addFiles/${id}`, formData);
    }

    addToFavorite(userId: string, bookId: string): Observable<any> {
        return this.http.put(RELATIVE_LINK + "addBookToFavorite", {
            userId,
            bookId
        }, httpOptions);
    }

    getBook(id: string): Observable<any> {
        return this.http.get(RELATIVE_LINK + `getBook/${id}`, httpOptions)
    }

    getBookFile(id: string): Observable<Blob> {
        return this.http.get(RELATIVE_LINK + `getBookFile/${id}`, {
            responseType: 'blob'
        });
    }

    getFavoriteBooks(id: string): Observable<any> {
        return this.http.get(RELATIVE_LINK + `getFavoriteBooks/${id}`, httpOptions);
    }

    getAllBooksSearch(): Observable<any> {
        return this.http.get(RELATIVE_LINK + "getAllBooksSearch", httpOptions);
    }

    getAllBooksTitle(): Observable<any> {
        return this.http.get(RELATIVE_LINK + "getAllBooksTitle", httpOptions);
    }

    getAllBooksByTitle(): Observable<any> {
        return this.http.get(RELATIVE_LINK + "getAllBooksByTitle", httpOptions);
    }

    getAllBooksByAddDate(): Observable<any> {
        return this.http.get(RELATIVE_LINK + "getAllBooksByAddDate", httpOptions);
    }
}