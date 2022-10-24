import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';
import { Book } from '../../book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  bookForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<EditBookComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private booksAPI: BooksApiService
  ) {}

  ngOnInit(): void {
    console;
    this.bookForm = this.fb.group({
      title: [this.data.book.title],
      author: [this.data.book.author],
      language: [this.data.book.language],
      pages: [this.data.book.pages],
      genre: [this.data.book.genre],
      description: [this.data.book.description],
    });
  }

  addNewBook() {
    this.matDialogRef.close(this.bookForm.value);
  }
  editBook() {
    const updatedBook = {
      id: this.data.book.id,
      ...this.bookForm.getRawValue(),
    };
    this.booksAPI.updateBook(updatedBook).subscribe((book: Book) => {
      this.matDialogRef.close(book);
    });
  }
}
