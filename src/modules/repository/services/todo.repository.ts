import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TodoEntity } from '../../../database/entities/todo.entity';
import {TodoListQueryDto} from "../../todos/models/dto/req/todo-list-query-dto";

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(TodoEntity, dataSource.manager);
  }

  public async findAll(
    query: TodoListQueryDto,
  ): Promise<[TodoEntity[], number]> {
    const qb = this.createQueryBuilder('client');
    qb.leftJoinAndSelect('client.records', 'records');
    if (query.status) {
      qb.andWhere('status.status = :status', { status: query.status });
    }

    qb.take(query.limit);
    qb.skip(query.offset);

    return await qb.getManyAndCount();
  }

  // public async findByParams(
  //   query: ClientListQueryDto,
  // ): Promise<[ClientEntity[], number]> {
  //   const skip = 0;
  //   const qb = this.createQueryBuilder('client');
  //   qb.leftJoinAndSelect('client.records', 'records');
  //
  //   if (query.search) {
  //     qb.andWhere('CONCAT(client.name, client.surname) LIKE :search');
  //     qb.setParameter('search', `%${query.search}%`);
  //   }
  //
  //   if (query.phone_num) {
  //     qb.andWhere('CONCAT(client.phone) LIKE :phone_num');
  //     qb.setParameter('phone_num', `%${query.phone_num}%`);
  //   }
  //
  //   if (query.email) {
  //     qb.andWhere('client.email = :email', { email: query.email });
  //   }
  //   qb.take(query.limit);
  //   qb.skip(skip);
  //
  //   return await qb.getManyAndCount();
  // }
}
