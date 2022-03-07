import { expect } from 'chai'

import Todos from './Todos'
import { Todo } from './entity/Todo'
import { Connection, getConnection, Repository, createConnection, getRepository } from "typeorm";

describe('Managing todos', function () {

    beforeEach(function () {
        return createConnection({
            type: "sqlite",
            database: ":memory:",
            dropSchema: true,
            entities: [Todo],
            synchronize: true,
            logging: false
        })
    })

    afterEach(function () {
        return getConnection().close()
    })

    it('create adds a todo', async function () {
        const todoRepo = getRepository(Todo)
        const myTodos = new Todos(todoRepo)
        const body = 'test'
        await myTodos.create(body)
        const todo = await todoRepo.findOne({
            where: { body }
        })
        expect(todo.body).to.be.equal(body)
    })

    it('read lists todos', async function () {
        const myTodos = new Todos(getRepository(Todo))
        await myTodos.create('test')
        const todos = await myTodos.read()
        todos.map(todo => {
            return expect(todo).to.be.instanceOf(Todo)
        })
    })

    it('update updates a todo in the list', async function () {
        const todoRepo = getRepository(Todo)
        const myTodos = new Todos(todoRepo)
        const oldBody = 'test'
        const newBody = 'test1'
        const oldTodo = todoRepo.create({body: oldBody})
        console.log(oldTodo)
        await myTodos.update(oldBody, newBody)
        const newTodo = await todoRepo.findOne({
            where: { body: newBody }
        })
        expect(oldTodo.body).to.not.be.equal(newTodo.body)
        expect(newTodo.body).to.be.equal(newBody)
    })

    it('delete deletes a todo in the list', async function () {

    })
})
