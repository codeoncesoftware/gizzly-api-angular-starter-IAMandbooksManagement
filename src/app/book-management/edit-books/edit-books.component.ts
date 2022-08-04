import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BooksManagementService } from '../books.service';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.scss']
})
export class EditBooksComponent implements OnInit {
  book: Book;
  constructor(private bookService: BooksManagementService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.bookService.getBook(id).subscribe(res => {
      this.book = res
    });
  }

  update() {
    this.bookService.updateBook(this.book).subscribe(res => {
      if(res) {
        this.router.navigate(['books']);
      }
    });
  }
}
