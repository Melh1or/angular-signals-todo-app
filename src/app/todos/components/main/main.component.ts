import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  templateUrl: './main.component.html',
  imports: [
    CommonModule,
    TodoComponent,
  ],
  standalone: true,
})
export class MainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter(todo => !todo.isCompleted);
    }

    if (filter === FilterEnum.completed) {
      return todos.filter(todo => todo.isCompleted);
    }

    return todos;
  });

  isAllTodosCompleted = computed(() => {
    const todos = this.todosService.todosSig();
    return todos.every(todo => todo.isCompleted);
  });

  noTodosClass = computed(() => {
    const todos = this.todosService.todosSig();
    return todos.length === 0;
  });

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAllTodos(target.checked);
  }

  setEditingId(id: string | null): void {
    this.editingId = id;
  }
}
