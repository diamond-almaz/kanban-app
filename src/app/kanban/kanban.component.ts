import { ChangeDetectorRef, Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { ITask } from '../types/interfaces/task.interface';
import { TaskStatus } from '../types/enums/task-status.enum';
import { CommonModule } from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import { KanbanTaskCardComponent } from './kanban-task-card/kanban-task-card.component';
import {CdkDragDrop, CdkDragStart, DragDropModule} from '@angular/cdk/drag-drop';
import { TaskTransitions } from '../types/enums/task-transitions.enum';
import { ITaskUpdatedData } from '../types/interfaces/task-updated-data.interface';

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
export class KanbanComponent implements OnChanges {
  @Input({required: true}) tasks!: ITask[];
  @Output() taskUpdated = new EventEmitter<ITaskUpdatedData>();
  columns?: ITaskColumn[];


  draggingData?: {
    statuses: {
      [key in TaskStatus]?: {
        transitions: TaskTransitions[]}
    },
    draggedItem: {
      task: ITask;
      index: number;
    }
  }

  TaskStatus = TaskStatus;
  TaskTransitions = TaskTransitions;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges() {
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

  onDragStarted(event: CdkDragStart<ITask>, index: number) {
    const task = event.source.data;
    let statuses: {
      [key in TaskStatus]?: {
        transitions: TaskTransitions[]}
    } = {};
    switch (task.status) {
      case TaskStatus.Paused: {
          statuses = {
            [TaskStatus.InProgress]: {
              transitions: [TaskTransitions.toWork],
            },
            [TaskStatus.Waiting]: {
              transitions: [TaskTransitions.return],
            }
          };
        }
        break;
      case TaskStatus.Waiting: {
          statuses = {
            [TaskStatus.InProgress]: {
              transitions: [TaskTransitions.toWork],
              }
            };
        break;
      }
      case TaskStatus.Completed: {
          statuses = {
            [TaskStatus.Waiting]: {
              transitions: [TaskTransitions.return],
            }
        };
        break;
      }
      case TaskStatus.InProgress: {
          statuses = {
            [TaskStatus.Completed]: {
              transitions: [TaskTransitions.toClose],
            },
            [TaskStatus.Paused]: {
              transitions: [TaskTransitions.toPause],
            },
          };
        break;
      }
    }

    this.draggingData = {
      statuses,
      draggedItem: {
        task, index
      }
    }
    this.cdr.detectChanges();
  }

  onDropListDropped(ev: CdkDragDrop<ITask>) {
    this.draggingData = undefined;
    if (ev.container.id === ev.previousContainer.id) return;
    const { id } = ev.item.data as ITask;
    let newStatus: TaskStatus | undefined;
    switch (ev.container.id) {
      case TaskTransitions.return: {
        newStatus = TaskStatus.Waiting;
        break;
      }
      case TaskTransitions.toPause: {
        newStatus = TaskStatus.Paused;
        break;
      }
      case TaskTransitions.toWork: {
        newStatus = TaskStatus.InProgress;
        break;
      }
      case TaskTransitions.toClose: {
        newStatus = TaskStatus.Completed;
      }
    }
    if (!newStatus) return;

    this.taskUpdated.emit({id, newStatus})
  }
}

