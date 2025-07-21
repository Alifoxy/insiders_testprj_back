import { Injectable } from '@nestjs/common';
import {TodoEntity} from "../../../database/entities/todo.entity";
import {TodoListQueryDto} from "../models/dto/req/todo-list-query-dto";
import {TodoListResDto} from "../models/dto/res/todo-list.res.dto";
import {TodoResDto} from "../models/dto/res/todo.res.dto";

@Injectable()
export class TodosMapper {
    public static toResDtoList(
        data: TodoEntity[],
        total: number,
        query: TodoListQueryDto,
    ): TodoListResDto {
        return { data: data.map(this.toResDto), total, ...query };
    }

    public static toResDto(data: TodoEntity): TodoResDto {
        return {
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
        };
    }
}