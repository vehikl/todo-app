import { expect } from 'chai'

import Todos from './Todos'
import { Todo } from './entity/Todo'
import { createConnection, Connection, Repository, getRepository } from "typeorm";

describe('Managing todos', function () {

    let myTodos: Todos;
    let connection: Connection;
    let todoRepo: Repository<Todo>

    before(async function () {
        // connection = await createConnection()
        todoRepo = getRepository(Todo)
    })

    beforeEach(function () {
        myTodos = new Todos()
        myTodos.addTodo('Buy eggs')

    })

    it.only('addTodo adds a todo', async function () {
        // const todo = await myTodos.addTodo('Buy eggs')
        const todoEntity = todoRepo.create({
            body: 'test',
            isDone: false
        })
        const todo = await todoRepo.save(todoEntity)
        expect(todo).to.be.instanceOf(Todo)
    })

    it('getTodos lists todos', function () {
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Buy chicken',
            'Feed chicken'
        ])
    })

    it('updateTodo updates a todo in the list', function () {
        myTodos.updateTodo('Feed chicken', 'Eat chicken')
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Buy chicken',
            'Eat chicken'
        ])
    })

    it('deleteTodo deletes a todo in the list', function () {
        myTodos.deleteTodo('Buy chicken')
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Feed chicken'
        ])
    })
})
