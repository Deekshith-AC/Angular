import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  searchUrl!: string;
  Result!:any;

  constructor(private http: HttpClient, private router: Router) { }
  logoutService(): void {
    localStorage.clear();
    this.router.navigate(['/']); // Redirect to home page after logout
  }

  searchBooks(query: string): Observable<any> {
    
    console.log("Searching books function Entered");
    this.searchUrl = `https://openlibrary.org/search.json?q=${query}&fields=author_name,isbn,publish_year,ratings_average,subject,title&limit=30`;
    console.log(this.searchUrl);
    this.Result = this.http.get<any>(this.searchUrl);
    // console.log(this.Result);        
    return this.Result;
  }
}
