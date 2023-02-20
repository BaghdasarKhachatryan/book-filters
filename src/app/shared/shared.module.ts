import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { RemoveBookComponent } from './components/remove-book/remove-book.component';
import { EditComponent } from './icons/edit/edit.component';
import { TrashComponent } from './icons/trash/trash.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    EditBookComponent,
    RemoveBookComponent,
    TrashComponent,
    EditComponent,
  ],
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    // Modules

    MaterialModule,
    FormsModule,
    ReactiveFormsModule,

    // Components
    TrashComponent,
    EditComponent,
  ],
})
export class SharedModule {}
