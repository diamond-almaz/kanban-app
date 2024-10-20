import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ITask } from '../types/interfaces/task.interface';
import { TaskStatus } from '../types/enums/task-status.enum';
import { tasksList } from './mock-data';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { KanbanTaskCardComponent } from './kanban-task-card/kanban-task-card.component';
import {CdkDragDrop, CdkDragEnter, CdkDragStart, DragDropModule} from '@angular/cdk/drag-drop';
import { TaskTransitions } from '../types/enums/task-transitions.enum';

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
  imports: [CommonModule, MatBadgeModule, KanbanTaskCardComponent, DragDropModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.scss',
})
export class KanbanComponent implements OnInit {
  columns?: ITaskColumn[];
  tasks = tasksList;

  draggingData?: {
    fromStatus: TaskStatus;
    statuses: {
      [key in TaskStatus]?: {
        connectedTo: TaskStatus;
        transitions: TaskTransitions[]}
    },
    arr: TaskTransitions[];
  }

  TaskStatus = TaskStatus;
  TaskTransitions = TaskTransitions;

  constructor(private cdr: ChangeDetectorRef) {}

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

  // ----------------------------------------------

  onDragStarted(event: CdkDragStart<ITask>) {
    const task = event.source.data;
    switch (task.status) {
      case TaskStatus.Paused: {
        this.draggingData = {
          fromStatus: task.status,
          statuses: {
            [TaskStatus.InProgress]: {
              transitions: [TaskTransitions.toWork],
              connectedTo: task.status,
            },
            [TaskStatus.Waiting]: {
              transitions: [TaskTransitions.return],
              connectedTo: task.status,
            }
          },
          arr: [TaskTransitions.toWork, TaskTransitions.return]
        }
        break;
      }
      case TaskStatus.Waiting: {
        this.draggingData = {
          fromStatus: task.status,
          statuses: {
            [TaskStatus.InProgress]: {
              transitions: [TaskTransitions.toWork],
              connectedTo: task.status,
            }
          },
          arr: [TaskTransitions.toWork]
        }
        break;
      }
      case TaskStatus.Completed: {
        this.draggingData = {
          fromStatus: task.status,
          statuses: {
            [TaskStatus.Waiting]: {
              transitions: [TaskTransitions.return],
              connectedTo: task.status,
            }
          },
          arr: [TaskTransitions.return],
        }
        break;
      }
      case TaskStatus.InProgress: {
        this.draggingData = {
          fromStatus: task.status,
          statuses: {
            [TaskStatus.Completed]: {
              transitions: [TaskTransitions.toClose],
              connectedTo: task.status
            },
            [TaskStatus.Paused]: {
              transitions: [TaskTransitions.toPause],
              connectedTo: task.status
            },
          },
          arr: [TaskTransitions.toClose, TaskTransitions.toPause]
        }
        break;
      }
    }
    this.cdr.detectChanges();
  }

  onDragEnded() {
    this.draggingData = undefined;
  }

  onDropListDropped(ev: CdkDragDrop<ITask>) {
    console.log('onDropListDropped', ev)
  }

  cdkDropListEntered(ev: CdkDragEnter) {
    console.log(this.draggingData?.statuses)
    console.log('entered to', ev.container.id)
  }

  cdkDropListEnterPredicate() {
    return false;
  }
}
