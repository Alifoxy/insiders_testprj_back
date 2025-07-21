import { TodoID } from '../../../../../common/types/entity-ids.type';
import {TodoStatusEnum} from "../../../../../database/entities/enums/todo-status.enum";

export class TodoResDto {
  id: TodoID;
  title: string;
  description: string;
  status: TodoStatusEnum;

}
