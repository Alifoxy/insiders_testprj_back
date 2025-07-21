import { TodoResDto } from './todo.res.dto';
import {TodoListQueryDto} from "../req/todo-list-query-dto";

export class TodoListResDto extends TodoListQueryDto {
  data: TodoResDto[];
  total: number;
}
