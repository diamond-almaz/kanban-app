import { Component, OnInit } from '@angular/core';
import { ITask } from '../types/interfaces/task.interface';
import { TaskStatus } from '../types/enums/task-status.enum';
import { tasksList } from './mock-data';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { KanbanTaskCardComponent } from './kanban-task-card/kanban-task-card.component';

const TASK_COLUMN_TITLES = {
  [TaskStatus.Waiting]: 'Waiting',
  [TaskStatus.Paused]: 'Paused',
  [TaskStatus.InProgress]: 'InProgress',
  [TaskStatus.Completed]: 'Completed',
}

const TASK_COLUMN_CLASSES = {
  [TaskStatus.Waiting]: 'waiting',
  [TaskStatus.Paused]: 'paused',
  [TaskStatus.InProgress]: 'in-progress',
  [TaskStatus.Completed]: 'completed',
}


interface ITaskColumn {
  title: string;
  status: TaskStatus;
  htmlClass: string;
  count: number;
  list: ITask[]
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CommonModule, MatBadgeModule, KanbanTaskCardComponent],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent implements OnInit {
  columns?: ITaskColumn[];
  tasks = tasksList;

  ngOnInit() {
    this.columns = this.computeColumns();
  }

  computeColumns() {
    const columnsObj = {} as { [key in TaskStatus]: ITaskColumn };

    [TaskStatus.Waiting,
    TaskStatus.Paused,
    TaskStatus.InProgress,
    TaskStatus.Completed].forEach((status) => {
      columnsObj[status] = {
        title: TASK_COLUMN_TITLES[status],
        status,
        htmlClass: TASK_COLUMN_CLASSES[status],
        count: 0,
        list: [],
      }
    })

    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      columnsObj[task.status].count++;
      columnsObj[task.status].list.push(task);
    }

    return [
      columnsObj[TaskStatus.Waiting],
      columnsObj[TaskStatus.Paused],
      columnsObj[TaskStatus.InProgress],
      columnsObj[TaskStatus.Completed],
    ]
  }
}
