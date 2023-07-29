import { Injectable, signal } from '@angular/core';

import { TodoInterface } from '../types/todo.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSig = signal<TodoInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  addTodo(text: string) {
    const newTodo: TodoInterface = {
      id: Date.now().toString(),
      text,
      isCompleted: false,
    };
    this.todosSig.update(todos => [...todos, newTodo]);
    console.log(this.todosSig());
  }

  changeFilter(filter: FilterEnum) {
    this.filterSig.set(filter);
  }

  changeTodoText(id: string, text: string): void {
    this.todosSig.update(todos => todos.map(todo => {
      return todo.id === id ? { ...todo, text } : todo;
    }));
  }

  removeTodoById(id: string) {
    this.todosSig.update(todos => todos.filter(todo => todo.id !== id));
  }

  toggleTodoById(id: string) {
    this.todosSig.update(todos => todos.map(todo => {
      return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
    }));
  }

  toggleAllTodos(isCompleted: boolean): void {
    this.todosSig.update(todos => todos.map(todo => {
      return { ...todo, isCompleted };
    }));
  }
}
