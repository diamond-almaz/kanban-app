import { Component } from '@angular/core';
import { ITask } from '../types/interfaces/task.interface';
import { TaskStatus } from '../types/enums/task-status.enum';
import { tasksList } from './mock-data';

const TASK_COLUMN_TITLES = {
  [TaskStatus.Waiting]: 'Waiting',
  [TaskStatus.Paused]: 'Paused',
  [TaskStatus.InProgress]: 'InProgress',
  [TaskStatus.Completed]: 'Completed',
}

interface ITaskColumn {
  name: string;
  status: TaskStatus;
  count: number;
  list: ITask[]
}

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss'
})
export class KanbanComponent {
  columns!: ITaskColumn[];
  tasks = tasksList;

  computeColumns() {
    const columnsObj = {} as { [key in TaskStatus]: ITaskColumn };

    [TaskStatus.Waiting,
    TaskStatus.Paused,
    TaskStatus.InProgress,
    TaskStatus.Completed].forEach((status) => {
      columnsObj[status] = {
        name: TASK_COLUMN_TITLES[status],
        status,
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
