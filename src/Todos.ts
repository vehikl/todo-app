import { Todo } from './entity/Todo'
import { Connection, Repository } from "typeorm";

export default class Todos {
    private list: string[] = []
    private todoRepo: Repository<Todo>

    constructor(todoRepo: Repository<Todo>) {
        this.todoRepo = todoRepo
    }

    public async read(): Promise<Todo[]> {
        return await this.todoRepo.find()
    }

    public async create(body: string) {
        const todoEntity = this.todoRepo.create({
            body,
            isDone: false
        })
        return await this.todoRepo.save(todoEntity)
    }

    public async update(oldBody: string, newBody: string) {
        const thing = await this.todoRepo.update({ body: oldBody }, { body: newBody})
        console.log(thing)
    }

    public delete(todo: string) {
        this.list.splice(this.list.indexOf(todo), 1)
    }
}
