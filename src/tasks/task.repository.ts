import { DataSource, Repository } from "typeorm";
import { Task } from "./task.entity";
import { Injectable } from "@nestjs/common";
import { TaskFilterDto } from "./dto/task-filter.dto";

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getById(id: string) {
    return this.findOne({ where: { id } });
  }

  async getAllTask(filterDto: TaskFilterDto): Promise<Task[]>{
    const {search, status} = filterDto;
    const query = this.createQueryBuilder('task');

    if(status){
      query.andWhere('task.status = :status', {status})
    }

    if(search){
      query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        {search: `%${search}%`})
    }

    const tasks = await query.getMany();
    return tasks;
  }
}
