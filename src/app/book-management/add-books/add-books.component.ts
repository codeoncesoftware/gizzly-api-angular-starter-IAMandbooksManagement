import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BooksManagementService } from '../books.service';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {
  book: Book;
  booksFormGroup: FormGroup | null;
  submitted: boolean = false;

  constructor(private bookService: BooksManagementService, private router: Router, private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.booksFormGroup = this.formBuilder.group({
      title: ["", Validators.required],
      author: ["", Validators.required],
      pagesNumber: [0, Validators.required],
    });
  }

  add() {
    this.submitted = true;
    this.bookService.addBook(this.booksFormGroup.value).subscribe(res => {
      if(res) {
        this.router.navigate(['books']);
      }
    });
  }

}
