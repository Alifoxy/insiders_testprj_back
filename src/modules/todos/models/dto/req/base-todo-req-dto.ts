import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
} from 'class-validator';
import {TodoStatusEnum} from "../../../../../database/entities/enums/todo-status.enum";
export class BaseTodoReqDto {
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