import {Todo} from './entity/Todo'
import {Connection, getConnection, Repository} from "typeorm";
import { create } from 'domain';
import { read } from 'fs';

export default class Todos {
    private list: string[] = []
    private todoRepo: Repository<Todo>

    constructor() {
        this.todoRepo = getConnection().getRepository(Todo)
    }

    public async getTodos(): Promise<Array<Todo>> {
        return await this.todoRepo.find()
    }

    public async addTodo(body: string) {
        await this.todoRepo.create({
            body,
            isDone: false
        })
    }

    public updateTodo(oldTodo: string, newTodo: string) {
        this.list[this.list.indexOf(oldTodo)] = newTodo
    }

    public deleteTodo(todo: string) {
        this.list.splice(this.list.indexOf(todo), 1)
    }
}
