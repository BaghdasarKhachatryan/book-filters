import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';
import { Book, FilteredBook } from 'src/app/shared/book.model';
import { EditBookComponent } from 'src/app/shared/components/edit-book/edit-book.component';
import { RemoveBookComponent } from 'src/app/shared/components/remove-book/remove-book.component';
import { AddBookComponent } from '../../shared/components/add-book/add-book.component';
import {
  combineLatest,
  debounceTime,
  forkJoin,
  Observable,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit, OnDestroy {
  books!: Book[];
  filteredValue!: FilteredBook;
  maxPagesCount!: number;
  minPagesCount!: number;

  destroy$: Subject<boolean> = new Subject();

  constructor(private dialog: MatDialog, public booksAPI: BooksApiService) {}

  ngOnInit(): void {
    const observables: [
      Observable<FilteredBook>,
      Observable<Book>,
      Observable<Book[]>
    ] = [
      this.booksAPI.filteredValue,
      this.booksAPI.addedBook,
      this.booksAPI.getBooksList(),
    ];

    combineLatest(observables)
      .pipe(takeUntil(this.destroy$))
      .subscribe(([filteredValue, addedBook, booksResponse]) => {
        this.filteredValue = filteredValue;
        if (addedBook.id) {
          this.books.push(addedBook);
        }
        this.books = booksResponse;

        let booksPages = this.books.map((book: Book) => book.pages);
        this.maxPagesCount = Math.max(...booksPages);
        this.minPagesCount = Math.min(...booksPages);
        this.booksAPI.books$.next(booksResponse);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBookComponent, {
      autoFocus: false,
      hasBackdrop: false,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((book: Book) => {
      this.booksAPI.addNewBook(book).subscribe((book: Book) => {
        this.books.push(book);
      });
    });
  }
  editBook(book: Book) {
    const editBookDialogRef = this.dialog.open(EditBookComponent, {
      data: { book },
    });
    editBookDialogRef.afterClosed().subscribe((book: Book) => {
      const updatedBook = this.books.find((item: Book) => item.id === book.id)!;
      const updatedBookIndex = this.books.indexOf(updatedBook);

      this.books[updatedBookIndex] = book;
    });
  }
  removeBook(book: Book) {
    const removebookDialogRef = this.dialog.open(RemoveBookComponent, {
      data: { ...book },
    });
    removebookDialogRef.afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.booksAPI.removeBook(book).subscribe(() => {
          this.books = this.books.filter((item) => item.id !== book.id);
        });
      }
    });
  }
}
