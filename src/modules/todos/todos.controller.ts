import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import {TodoID} from '../../common/types/entity-ids.type';
import {TodosService} from "./services/todos.service";
import {BaseTodoReqDto} from "./models/dto/req/base-todo-req-dto";
import {TodosMapper} from "./services/todos.mapper";
import {TodoListResDto} from "./models/dto/res/todo-list.res.dto";
import {TodoListQueryDto} from "./models/dto/req/todo-list-query-dto";
import {UpdateTodoDto} from "./models/dto/req/update-todo-dto";
import {TodoResDto} from "./models/dto/res/todo.res.dto";

@Controller('clients')
export class TodosController {
    constructor(private todosService: TodosService) {}

    @Post()
    public async create(@Body() dto: BaseTodoReqDto) {
        const result = await this.todosService.create(dto);
        return TodosMapper.toResDto(result);
    }

    @Get()
    public async findAll(
        @Query() query: TodoListQueryDto,
    ): Promise<TodoListResDto> {
        const [entities, total] = await this.todosService.findAll(query);
        return TodosMapper.toResDtoList(entities, total, query);
    }


    @Get(':todoId')
    public async findOne(
        @Param('todoId', ParseUUIDPipe) todoId: TodoID,
    ): Promise<TodoResDto> {
        const result = await this.todosService.findOne(todoId);
        return TodosMapper.toResDto(result);
    }

    @Patch(':todoId')
    public async update(
        @Param('todoId', ParseUUIDPipe) todoId: TodoID,
        @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<TodoResDto> {
        const result = await this.todosService.update(todoId, updateTodoDto);
        return TodosMapper.toResDto(result);
    }

    @Delete(':todoId')
    public async remove(@Param('statusId', ParseUUIDPipe) todoId: TodoID) {
        return this.todosService.remove(todoId);
    }
}