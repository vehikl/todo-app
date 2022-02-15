import {Todo} from './entity/Todo'
import {Connection, createConnection} from "typeorm";

export default class Todos {
    private list: string[] = [];

    public getTodos(): string[] {
        return this.list;
    }

    public async addTodo(body: string) {
        const todo = new Todo();
        todo.body = body
        todo.isDone = false

        const connection = await createConnection()

        await connection.manager.save(todo)
    }

    public updateTodo(oldTodo: string, newTodo: string) {
        this.list[this.list.indexOf(oldTodo)] = newTodo
    }

    public deleteTodo(todo: string) {
        this.list.splice(this.list.indexOf(todo), 1)
    }
}
