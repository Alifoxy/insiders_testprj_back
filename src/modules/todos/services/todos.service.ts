import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../../repository/services/todo.repository';
import {TodoID} from '../../../common/types/entity-ids.type';
import {UpdateTodoDto} from "../models/dto/req/update-todo-dto";
import {TodoEntity} from "../../../database/entities/todo.entity";
import {TodoListQueryDto} from "../models/dto/req/todo-list-query-dto";
import {BaseTodoReqDto} from "../models/dto/req/base-todo-req-dto";

@Injectable()
export class TodosService {
    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    public async create(dto: BaseTodoReqDto): Promise<TodoEntity> {
        return await this.todoRepository.save(this.todoRepository.create(dto));
    }

    public async findAll(
        query: TodoListQueryDto,
    ): Promise<[TodoEntity[], number]> {
        return await this.todoRepository.findAll(query);
    }

    public async findOne(todoId: TodoID): Promise<TodoEntity|null> {
        return await this.todoRepository.findOneBy({ id: todoId });
    }

    public async update(
        todoId: TodoID,
        dto: UpdateTodoDto,
    ): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOneBy({id:todoId});
        this.todoRepository.merge(todo, dto);
        return await this.todoRepository.save(todo);
    }

    public async remove(todoId: TodoID): Promise<TodoEntity> {
        const todo = await this.todoRepository.findOneBy({
            id: todoId,
        });

        return this.todoRepository.remove(todo);
    }

}