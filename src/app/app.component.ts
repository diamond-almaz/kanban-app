import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { KanbanComponent } from "./kanban/kanban.component";
import { CommonModule } from '@angular/common';
import { tasksList } from './kanban/mock-data';
import { ITaskUpdatedData } from './types/interfaces/task-updated-data.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, KanbanComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  tasks = tasksList;

  taskUpdated({id: ID, newStatus}: ITaskUpdatedData) {
    console.log('ID', ID)
    this.tasks = this.tasks.map(task =>
      task.id === ID
        ? { ...task, status: newStatus }
        : task
    );
  }
}
