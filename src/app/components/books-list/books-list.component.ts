import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';
import { Book, FilteredBook } from 'src/app/shared/book.model';
import { EditBookComponent } from 'src/app/shared/components/edit-book/edit-book.component';
import { RemoveBookComponent } from 'src/app/shared/components/remove-book/remove-book.component';
import { AddBookComponent } from '../../shared/components/add-book/add-book.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss'],
})
export class BooksListComponent implements OnInit {
  books!: Book[];
  filteredValue!: FilteredBook;
  constructor(private dialog: MatDialog, public booksAPI: BooksApiService) {}

  ngOnInit(): void {
    this.booksAPI.filteredValue.subscribe((book: FilteredBook) => {
      this.filteredValue = book;
    });
    this.booksAPI.addedBook.subscribe((book: Book) => {
      if (book.id) {
        this.books.push(book);
      }
    });
    this.booksAPI.getBooksList().subscribe((booksResponse: Book[]) => {
      this.books = booksResponse;
      this.booksAPI.books$.next(booksResponse);
    });
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
