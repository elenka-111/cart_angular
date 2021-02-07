import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import {TodosService} from '../shared/todos.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})

export class TodosComponent implements OnInit {

  constructor(public todosServise: TodosService) { }

  ngOnInit(): void {
  }

  onChange(id: number): void{
    this.todosServise.forToggle(id);
  }
  delete(id: number): void{
    this.todosServise.deleteOne(id);
  }

}
