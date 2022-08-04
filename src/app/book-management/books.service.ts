import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import * as _ from "lodash";
import { environment } from "../../environments/environment";
import { Book } from "./book";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BooksManagementService {
  endpoint = environment.grizzlyUrlBooksManagement;

  constructor(private http: HttpClient, private router: Router) {}

  headers = new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("grizzly-token"),
  });

  addBook(book: Book) {
    return this.http.post(this.endpoint + "/add", book, {
      headers: this.headers,
    });
  }

  updateBook(book: Book) {
    return this.http.put(this.endpoint + "/edit", book, {
      headers: this.headers,
    });
  }
  getBook(_id: string): Observable<Book> {
    return this.http.get<Book>(this.endpoint + "/getById", {
      params: { _id },
      headers: this.headers,
    });
  }

  deleteBook(_id: string) {
    return this.http.delete(this.endpoint + "/delete", {
      params: { _id },
      headers: this.headers,
    });
  }

  getAllBook(): Observable<Book[]> {
    return this.http.get<Book[]>(this.endpoint + "/all", {
      headers: this.headers,
    });
  }
}
