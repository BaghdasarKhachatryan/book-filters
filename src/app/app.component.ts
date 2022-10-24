import { Component, OnInit } from '@angular/core';
import { BooksApiService } from './shared/services/booksApi.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'test_app_redBridge';
  constructor(private booksApi: BooksApiService) {}
}
