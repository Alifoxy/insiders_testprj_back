import {
    Column,
    Entity,
    Index,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { TableNameEnum } from './enums/table-name.enum';
import { TodoID } from '../../common/types/entity-ids.type';
import { CreateUpdateModel } from './models/create-update.model';
import { TodoStatusEnum } from "./enums/todo-status.enum";

@Index(['id'])
@Entity(TableNameEnum.TODOS)
export class TodoEntity extends CreateUpdateModel {
    @PrimaryGeneratedColumn('uuid')
    id: TodoID;

    @Column('text')
    title: string;

    @Column('text')
    description: string;

    @Column({
        type: "enum",
        enum: TodoStatusEnum,
        default: TodoStatusEnum.TODO,
    })
    status: TodoStatusEnum;


}