import { TaskStatus } from "../enums/task-status.enum";

export interface ITaskUpdatedData {
  id: string;
  newStatus: TaskStatus
}
