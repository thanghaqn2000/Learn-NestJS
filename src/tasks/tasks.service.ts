import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskFilterDto } from './dto/task-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly dataRepository: TaskRepository) {}

  async getById(id: string): Promise<Task> {
    return this.dataRepository.getById(id);
  }


  // async getAllTasks(): Promise<Task[]> {
  //   return this.dataRepository.find();
  // }

  async getAllTasks(filterDto: TaskFilterDto): Promise<Task[]> {
    return this.dataRepository.getAllTask(filterDto);
  }


  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.dataRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    })

    await this.dataRepository.save(task);
    return task;
  }

  // getTaskById(id: string): Task {
  //   return this.tasks.find((task) => task.id === id);
  // }

  async deleteTaskById(id: string): Promise<void> {
    // const taskDeleted = this.dataRepository.getById(id);
   const result = await this.dataRepository.delete(id);

   if(result.affected === 0){
      throw new NotFoundException(`Task with id "${id}" not found`)
   }
  }

  // updateTask(updateTaskDto: UpdateTaskDto, id: string): Task {
  //   const { title, description } = updateTaskDto;

  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   const indexToUpdate: number = this.tasks.findIndex(
  //     (task) => task.id === id,
  //   );
  //   if (indexToUpdate !== -1) {
  //     this.tasks[indexToUpdate] = task;
  //   }
  //   return task;
  // }
}
