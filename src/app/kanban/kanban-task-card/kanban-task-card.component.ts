import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { ITask } from '../../types/interfaces/task.interface';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-kanban-task-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './kanban-task-card.component.html',
  styleUrl: './kanban-task-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanTaskCardComponent {
  @Input({required: true}) task!: ITask;
}
