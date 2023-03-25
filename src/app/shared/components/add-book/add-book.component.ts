import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent implements OnInit {
  public bookForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<AddBookComponent>
  ) {}

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      language: ['', Validators.required],
      pages: ['', Validators.required],
      genre: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  public addNewBook() {
    this.matDialogRef.close(this.bookForm.value);
  }
}
