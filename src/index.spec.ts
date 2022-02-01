import { expect } from 'chai'
import Todos from "./Todos";

describe('Managing todos', () => {
    it('adds a todo', () => {
        const myTodos = new Todos();
        myTodos.addTodo("Buy eggs");
        expect(myTodos.getTodos()).to.deep.include("Buy eggs");
    })

    it('lists todos', () => {
        const myTodos = new Todos();
        myTodos.addTodo("Buy eggs");
        myTodos.addTodo("Buy chicken");
        myTodos.addTodo("Feed chicken");
        expect(myTodos.getTodos()).to.deep.equal([
            "Buy eggs",
            "Buy chicken",
            "Feed chicken"
        ]);
    })
})