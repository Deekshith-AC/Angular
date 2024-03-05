import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from 'src/app/Services/book-service.service';

@Component({
  selector: 'app-home-book',
  templateUrl: './home-book.component.html',
  styleUrls: ['./home-book.component.css']
})
export class HomeBookComponent {
  userdata!:any;
  sitem!:any;
  UserDisplyName: string = ''; // Initialize UserDisplyName property
  sortingDD: boolean = false; // Initialize sortingDD property
  selectedItem: string = ''; // Initialize selectedItem property
  Sitems: string[] = []; // Initialize Sitems array
  searchBook: string = ''; // Initialize searchBook property
  searchedBookResult: any[] = []; // Initialize searchedBookResult array
  displaySearch: boolean = false; // Initialize displaySearch property
  SearchImage: boolean = true; // Initialize SearchImage property

  constructor(private booksService: BookServiceService, private router: Router) {}

  ngOnInit(): void {
    // Check if user is logged in
    this.userdata = window.localStorage.getItem('user');
    const user = JSON.parse(this.userdata);
    if (!user) {
      this.logout();
    } else {
      this.UserDisplyName = user.fullName;
    }
  }

  logout(): void {
    console.log('Logging out');
    localStorage.removeItem('user');
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  SortingFun(array: any[], property: string, ascending: boolean = true): void {
    console.log("Step1");
    console.log(this.searchedBookResult[0]);
    
    
    this.searchedBookResult =  array.sort((a, b) => {
    if (a[property] < b[property]) {
      return ascending ? -1 : 1;
    }
    if (a[property] > b[property]) {
      return ascending ? 1 : -1;
    }
    console.log(this.searchedBookResult[0]);
    return 0;
  });
}
// if (this.selectedItem === 'Title') {
    //   this.searchedBookResult.sort((a, b) => a.title.localeCompare(b.title));
    // } else if (this.selectedItem === 'Author Name') {
    //   this.searchedBookResult.sort((a, b) => a.author_name[0].localeCompare(b.author_name[0]));
    // } else if (this.selectedItem === 'Year') {
    //   this.searchedBookResult.sort((a, b) => a.publish_year[0] - b.publish_year[0]);
    // } else if (this.selectedItem === 'Rating') {
    //   this.searchedBookResult.sort((a, b) => b.ratings_average - a.ratings_average); // Descending order for rating
    // }
 
  // }

  searchBookFun(): void {
    if (this.searchBook) {
      this.SearchImage = true;
      this.displaySearch = false;

      this.booksService.searchBooks(this.searchBook).subscribe(
        (searchBookResult: any) => {
          this.searchedBookResult = searchBookResult["docs"];
          console.log(this.searchedBookResult);
          
          this.displaySearch = true;

          // Populate Sitems for sorting
          this.sortingDD = true;
          this.Sitems = ['Title', 'Author Name', 'Year', 'Rating'];
          this.selectedItem = 'Title';

          this.SearchImage = false;
        },
        (error) => {
          console.error('Error searching books:', error);
          this.searchedBookResult.push({ title: 'Sorry, there was an error in finding the book you searched.' });
        },
        () => {
          this.searchBook = '';
        }
      );
    }
  }

}
