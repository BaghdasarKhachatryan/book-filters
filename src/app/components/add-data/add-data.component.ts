import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from 'src/app/shared/book.model';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';
import { AddBookComponent } from '../../shared/components/add-book/add-book.component';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss'],
})
export class AddDataComponent implements OnInit {
  constructor(
    private matDialog: MatDialog,
    private booksAPI: BooksApiService
  ) {}

  ngOnInit(): void {}
  addBook() {
    const dialogRef = this.matDialog.open(AddBookComponent);

    dialogRef.afterClosed().subscribe((book: Book) => {
      this.booksAPI.addNewBook(book).subscribe((book: Book) => {
        this.booksAPI.addedBook$.next(book);
      });
    });
  }
}
