import { CommonModule } from '@angular/common';
import {
  Component, ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { TodoInterface } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  templateUrl: './todo.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter<string | null>();

  @ViewChild('textInput') textInput!: ElementRef;

  todosService = inject(TodosService);
  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.editingText = target.value;
  }

  changeTodo(): void {
    this.todosService.changeTodoText(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  seTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
   }

  removeTodo(): void {
    this.todosService.removeTodoById(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodoById(this.todo.id);
  }
}
