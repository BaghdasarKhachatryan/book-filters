import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Book, FilteredBook } from 'src/app/shared/book.model';
import { BooksApiService } from 'src/app/shared/services/booksApi.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  filtersForm!: FormGroup;
  authors!: string[];
  languages!: string[];

  destroy$: Subject<boolean> = new Subject();

  constructor(private fb: FormBuilder, private booksAPI: BooksApiService) {}

  ngOnInit(): void {
    this.initForm();

    this.booksAPI.books
      .pipe(takeUntil(this.destroy$))
      .subscribe((booksResponse: Book[]) => {
        this.authors = booksResponse.map((item) => item.author);
        const allLanguages = booksResponse.map((item) => item.language);
        this.languages = Array.from(new Set(allLanguages));
      });

    this.filtersForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((data: FilteredBook) => {
        this.booksAPI.filteredValue$.next(data);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private initForm(): void {
    this.filtersForm = this.fb.group({
      title: [''],
      description: [''],
      author: [''],
      language: [''],
      pagesMinCount: [''],
      pagesMaxCount: [''],
    });
  }
}
