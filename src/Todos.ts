export default class Todos {
    private list: string[] = [];

    public getTodos(): string[] {
        return this.list;
    }

    public addTodo(todo: string) {
        this.list.push(todo);
    }

    public updateTodo(oldTodo: string, newTodo: string) {
        this.list[this.list.indexOf(oldTodo)] = newTodo
    }

    public deleteTodo(todo: string) {
        this.list.splice(this.list.indexOf(todo), 1)
    }
}
