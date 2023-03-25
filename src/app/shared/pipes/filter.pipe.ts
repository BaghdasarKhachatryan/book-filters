import { Pipe, PipeTransform } from '@angular/core';
import { Book, FilteredBook } from '../book.model';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(books: Book[], value: FilteredBook): Book[] {
    if (
      !value?.title.trim() &&
      !value?.author.trim() &&
      !value?.language.trim() &&
      !value?.description.trim() &&
      !value?.pagesMinCount.trim() &&
      !value?.pagesMaxCount.trim()
    ) {
      return books;
    } else {
      return books
        ?.filter((book) => {
          return book?.title.toLowerCase().includes(value.title.toLowerCase());
        })
        .filter((item) => {
          return item.description
            .toLowerCase()
            .includes(value.description.toLowerCase());
        })
        .filter((book) => {
          return book.author.toLowerCase().includes(value.author.toLowerCase());
        })
        .filter((item) => {
          return item.language
            .toLowerCase()
            .includes(value.language.toLowerCase());
        })
        .filter((item) => {
          if (!value.pagesMinCount && !value.pagesMaxCount) {
            return true;
          } else if (value.pagesMinCount && !value.pagesMaxCount) {
            return item.pages >= +value.pagesMinCount;
          } else if (!value.pagesMinCount && value.pagesMaxCount) {
            return item.pages <= +value.pagesMaxCount;
          } else {
            return (
              item.pages >= +value.pagesMinCount &&
              item.pages <= +value.pagesMaxCount
            );
          }
        });
    }
  }
}
