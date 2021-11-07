import { WorkTodoType } from "./work-todo.type";

export interface WorkTodoPostInterface extends WorkTodoType {
  repeatedDaysOfTheWeek: number[];
}
