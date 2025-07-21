import { PickType } from '@nestjs/swagger';

import { BaseClientReqDto } from './base-client.req.dto';
import {
    IsEmail, IsEnum,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import {BaseTodoReqDto} from "./base-todo-req-dto";
import {TodoStatusEnum} from "../../../../../database/entities/enums/todo-status.enum";

export class UpdateTodoDto extends PickType(BaseTodoReqDto, [
    'title',
    'description',
]) {
    @IsOptional()
    @Length(0, 300)
    @IsString()
    title: string;

    @IsNotEmpty()
    @Length(0, 300)
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsEnum(TodoStatusEnum)
    status: string;
}