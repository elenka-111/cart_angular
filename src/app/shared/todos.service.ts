import {Injectable} from '@angular/core';

interface Todo{
  id: number;
  title: string;
  completed: boolean;
  date?: any;
}

@Injectable({providedIn: 'root'})
export class TodosService{
  public todos: Todo[] = [
    {id: 1, title: 'Buy bread', completed: false, date: new Date()},
    {id: 2, title: 'Buy milk', completed: true, date: new Date()},
    {id: 3, title: 'Buy cheese', completed: false, date: new Date()},
  ];
  forToggle(id: number): void{
    const idx = this.todos.findIndex(t => t.id === id);
    this.todos[idx].completed = !this.todos[idx].completed;
    console.log(id);
  }
  deleteOne(id: number): void{
    console.log('delete ', id);
    this.todos = this.todos.filter((todo) => todo.id !== id );

  }
}
