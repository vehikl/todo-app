import { expect } from 'chai'

import Todos from './Todos'

describe('Managing todos', () => {

    let myTodos: Todos;

    beforeEach(() => {
        myTodos = new Todos()
        myTodos.addTodo('Buy eggs')
        myTodos.addTodo('Buy chicken')
        myTodos.addTodo('Feed chicken')
    })

    it('addTodo adds a todo', () => {
        myTodos.addTodo('Eat chicken')
        expect(myTodos.getTodos()).to.deep.include('Eat chicken')
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
