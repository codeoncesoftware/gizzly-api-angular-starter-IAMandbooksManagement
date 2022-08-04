import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { environment } from '@env/environment';
import { includes } from 'lodash';
import { Book } from './book';
import { BooksManagementService } from './books.service';

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.scss']
})
export class BookManagementComponent implements OnInit {
  endpoint = environment.grizzlyUrlBooksManagement;

  booksList: Book[];
  isAdmin = false;
  constructor(private router: Router, private bookService: BooksManagementService, private authService: AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('identityProvider') === 'None') {
      this.authService.me()
      .subscribe(user => {
        if(includes(user['roles'], 'admin')) {
          this.isAdmin = true;
        }
      });
    } else {
      this.authService.UserInfo().subscribe(res => {
        console.log(res)
        if(includes(res['roles'], 'admin')) {
          this.isAdmin = true;
        }
      })
    }

    this.bookService.getAllBook().subscribe(res => {
      this.booksList = res;
    })
  }

  onDelete(id: string) {
    this.bookService.deleteBook(id).subscribe(res => {
        window.location.href = window.location.origin + '/books';
    });
  }

  onEdit(id: string) {
    this.router.navigate(
      ['/editBook'],
      { queryParams: { id: id} }
    );
  
  }
  onAdd() {
    this.router.navigateByUrl('addBook');
  }

}
