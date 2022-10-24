import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book, FilteredBook } from '../book.model';

@Injectable({
  providedIn: 'root',
})
export class BooksApiService {
  defaultFilteredValue: FilteredBook = {
    title: '',
    author: '',
    language: '',
    pagesMinCount: '',
    pagesMaxCount: '',
    description: '',
    genre: '',
  };
  public filteredValue$: BehaviorSubject<FilteredBook> = new BehaviorSubject(
    this.defaultFilteredValue
  );
  public addedBook$: BehaviorSubject<Book> = new BehaviorSubject({} as Book);
  public books$: BehaviorSubject<Book[]> = new BehaviorSubject([] as Book[]);

  constructor(private httpClient: HttpClient) {}

  get filteredValue() {
    return this.filteredValue$.asObservable();
  }

  get addedBook() {
    return this.addedBook$.asObservable();
  }

  get books() {
    return this.books$.asObservable();
  }

  getBooksList(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${environment.api_url}/books`);
  }
  addNewBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(`${environment.api_url}/books`, book);
  }
  updateBook(book: Book) {
    return this.httpClient.put<Book>(
      `${environment.api_url}/books/${book.id}`,
      book
    );
  }
  removeBook(book: Book) {
    return this.httpClient.delete<Book>(
      `${environment.api_url}/books/${book.id}`
    );
  }
}
