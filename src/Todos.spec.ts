import { expect } from 'chai'

import Todos from './Todos'
import { Todo } from './entity/Todo' 
import {createConnection, Connection, getRepository, getManager} from "typeorm";

describe('Managing todos', function () {

    let myTodos: Todos;
    let connection: Connection;
    let todoRepo

    before(async function() {
        connection = await createConnection()
        todoRepo = await connection.getRepository(Todo)
    })

    beforeEach(() => {
        myTodos = new Todos()
        myTodos.addTodo('Buy eggs')

    })

    it.only('addTodo adds a todo', async function () {
        await myTodos.addTodo('Buy eggs')
        const expectedResult = {
            body: 'Buy eggs',
            id: 1,
            isDone: false,
            createdAt: new Date()
        }
        
        //our first assertion: check that the item added is not there
        expect(connection).to.be.instanceOf(Connection)

        const result = await todoRepo.findOne({where: {body: "Buy eggs" }})
        console.log( await todoRepo.find())
        expect(result).to.be.deep.equal(expectedResult)
        //add item to db

        //our second assertion: check that the item added is there
        //expect: Buy eggs is in db

    })

    it('getTodos lists todos', () => {
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Buy chicken',
            'Feed chicken'
        ])
    })

    it('updateTodo updates a todo in the list', () => {
        myTodos.updateTodo('Feed chicken', 'Eat chicken')
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Buy chicken',
            'Eat chicken'
        ])
    })

    it('deleteTodo deletes a todo in the list', () => {
        myTodos.deleteTodo('Buy chicken')
        expect(myTodos.getTodos()).to.deep.equal([
            'Buy eggs',
            'Feed chicken'
        ])
    })
})
