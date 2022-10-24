import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Book, FilteredBook } from 'src/app/shared/book.model';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit {
  filtersForm!: FormGroup;
  authors!: string[];
  languages!: string[];

  constructor(private fb: FormBuilder, private booksAPI: BooksApiService) {}

  ngOnInit(): void {
    this.booksAPI.books.subscribe((booksResponse: Book[]) => {
      this.authors = booksResponse.map((item) => item.author);
      const allLanguages = booksResponse.map((item) => item.language);
      this.languages = Array.from(new Set(allLanguages));
    });
    this.filtersForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      language: [''],
      pagesMinCount: [''],
      pagesMaxCount: [''],
    });
    this.filtersForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((data: FilteredBook) => {
        data;
        this.booksAPI.filteredValue$.next(data);
      });
  }
}