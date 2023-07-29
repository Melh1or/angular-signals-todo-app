import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { FilterEnum } from '../../types/filter.enum';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule],
  standalone: true,
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig;

  filterEnum = FilterEnum;

  activeCount = computed(() => {
    return this.todosService.todosSig().filter(todo => !todo.isCompleted).length;
  });

  noTodosClass = computed(() => {
    return this.todosService.todosSig().length === 0;
  });

  itemsLeftText = computed(() => {
    return `item${this.activeCount() === 1 ? '' : 's'} left`;
  });

  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}
