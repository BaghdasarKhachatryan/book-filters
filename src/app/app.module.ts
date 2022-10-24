import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FiltersComponent } from './components/filters/filters.component';
import { AddBookComponent } from './shared/components/add-book/add-book.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { FilterPipe } from './shared/filter.pipe';
import { AddDataComponent } from './components/add-data/add-data.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    FiltersComponent,
    AddBookComponent,
    BooksListComponent,
    FilterPipe,
    AddDataComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
