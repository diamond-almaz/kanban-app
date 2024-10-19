import { TaskPriority } from "../enums/task-priority.enum";
import { TaskStatus } from "../enums/task-status.enum";
import { IAssignee } from "./assignee.interface";

export interface ITask {
  id: string; // GUID
  title: string;
  status: TaskStatus;
  assignee: IAssignee;
  priority: TaskPriority;
  createdAt: Date;
}
