import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  deleteTaskById(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTask(updateTaskDto: UpdateTaskDto, id: string): Task {
    const { title, description } = updateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    const indexToUpdate: number = this.tasks.findIndex(
      (task) => task.id === id,
    );
    if (indexToUpdate !== -1) {
      this.tasks[indexToUpdate] = task;
    }
    return task;
  }
}
