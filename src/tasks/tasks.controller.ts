import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { Task } from './task.entity';
import { TaskFilterDto } from './dto/task-filter.dto';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // async getAllTasks(): Promise<Task[]> {
  //   return await this.taskService.getAllTasks();
  // }

  @Get()
  async getAllTasks(@Query() filterDto: TaskFilterDto): Promise<Task[]> {
    return await this.taskService.getAllTasks(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    const found = await this.taskService.getById(id);
    if(!found){
      throw new NotFoundException(`Task with id "${id}" not found`)
    }

    return found;
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }

  // @Put('/:id')
  // updateTask(@Body() updateTaskDto: UpdateTaskDto, @Param('id') id: string): Task {
  //   return this.taskService.updateTask(updateTaskDto, id);
  // }
}
