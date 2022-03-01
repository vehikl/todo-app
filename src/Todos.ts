import {Todo} from './entity/Todo'
import {Connection, getConnection, Repository} from "typeorm";

export default class Todos {
    private list: string[] = [];
    private connection: Connection
    private repository: Repository<Todo>


    private async outGetConnection () {
        this.connection = await getConnection()
        this.repository = await this.connection.getRepository(Todo)
    }

    public getTodos(): string[] {
        return this.list;
    }

    public async addTodo(body: string) {
        const todo = new Todo();
        todo.body = body
        todo.isDone = false;

        await this.outGetConnection()
        await this.repository.create({
            body,
            isDone: false
        })


        // TODO: might be better to abandon connection singleton and just retrive the getConnection/getRepository functions instead
        // await Connection.save(todo)
    }

    public updateTodo(oldTodo: string, newTodo: string) {
        this.list[this.list.indexOf(oldTodo)] = newTodo
    }

    public deleteTodo(todo: string) {
        this.list.splice(this.list.indexOf(todo), 1)
    }
}
