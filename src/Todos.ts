export default class Todos {
    list: string[] = [];

    getTodos() {
        return this.list;
    }

    addTodo(todo: string) {
        this.list.push(todo);
    }
}