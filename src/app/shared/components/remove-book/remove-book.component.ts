import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-book',
  templateUrl: './remove-book.component.html',
  styleUrls: ['./remove-book.component.scss'],
})
export class RemoveBookComponent implements OnInit {
  constructor(
    private matDialogRef: MatDialogRef<RemoveBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  public deleteBook() {
    this.matDialogRef.close(true);
  }
}
