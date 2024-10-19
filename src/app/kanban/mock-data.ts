import { v4 as uuidv4 } from 'uuid';
import { TaskPriority } from "../types/enums/task-priority.enum";
import { TaskStatus } from "../types/enums/task-status.enum";
import { ITask } from "../types/interfaces/task.interface";

export const tasksList: ITask[] = [
  {
    id: uuidv4(),
    title: 'Подготовка отчетов для ежемесячного совещания',
    status: TaskStatus.Waiting,
    assignee: {
      id: uuidv4(),
      name: 'aivanova',
      fullname: 'Анна Иванова',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Исследование возможностей внедрения новой CRM системы',
    status: TaskStatus.Waiting,
    assignee: {
      id: uuidv4(),
      name: 'opetrov',
      fullname: 'Олег Петров',
    },
    priority: TaskPriority.High,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Подготовка материалов для презентации на конференцию',
    status: TaskStatus.Waiting,
    assignee: {
      id: uuidv4(),
      name: 'vsidorov',
      fullname: 'Виктор Сидоров',
    },
    priority: TaskPriority.Low,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Рефакторинг кода старого модуля',
    status: TaskStatus.Paused,
    assignee: {
      id: uuidv4(),
      name: 'skuznetsov',
      fullname: 'Сергей Кузнецов',
    },
    priority: TaskPriority.Low,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Настройка системы CI/CD для нового проекта',
    status: TaskStatus.Paused,
    assignee: {
      id: uuidv4(),
      name: 'ialekseeva',
      fullname: 'Ирина Алексеева',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Разработка нового функционала для мобильного приложения',
    status: TaskStatus.InProgress,
    assignee: {
      id: uuidv4(),
      name: 'msidorova',
      fullname: 'Мария Сидорова',
    },
    priority: TaskPriority.High,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Оптимизация производительности backend-сервиса',
    status: TaskStatus.InProgress,
    assignee: {
      id: uuidv4(),
      name: 'pvasilev',
      fullname: 'Павел Васильев',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Обновление дизайна корпоративного веб-сайта',
    status: TaskStatus.Completed,
    assignee: {
      id: uuidv4(),
      name: 'dkovalev',
      fullname: 'Дмитрий Ковалев',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Разработка руководства для новых сотрудников',
    status: TaskStatus.Completed,
    assignee: {
      id: uuidv4(),
      name: 'efedorova',
      fullname: 'Екатерина Федорова',
    },
    priority: TaskPriority.Low,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Интеграция с внешним API для автоматизации процессов',
    status: TaskStatus.Completed,
    assignee: {
      id: uuidv4(),
      name: 'asmirnov',
      fullname: 'Алексей Смирнов',
    },
    priority: TaskPriority.High,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Тестирование системы управления версиями',
    status: TaskStatus.Waiting,
    assignee: {
      id: uuidv4(),
      name: 'jdoe',
      fullname: 'Джон Доу',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: 'Написание документации по новому модулю',
    status: TaskStatus.Paused,
    assignee: {
      id: uuidv4(),
      name: 'mivanov',
      fullname: 'Михаил Иванов',
    },
    priority: TaskPriority.Medium,
    createdAt: new Date(),
  }
];
