import { Component } from '@angular/core';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, MainComponent, TodoComponent],
})
export class TodosComponent {

}
