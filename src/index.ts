import 'reflect-metadata';
import {createConnection, Connection, getConnection} from 'typeorm';
import inquirer from 'inquirer'

import {User} from './entity/User';
import Todos from './Todos'

enum Operation {
    Create = 'CREATE',
    Read = 'READ',
    Update = 'UPDATE',
    Delete = 'DELETE',
    Quit = 'QUIT',
    Continue = 'CONTINUE'
}

const mytodos = new Todos()

const todos = () => {
    return mytodos.getTodos()
}

const questions: inquirer.QuestionCollection<any> = [
    {
        type: 'rawlist',
        name: 'todoOptions',
        message: 'Choose an Option:',
        choices: [Operation.Create, Operation.Read, Operation.Quit],
    },
    {
        type: 'input',
        name: 'createTodo',
        message: 'Enter your TODO:',
        when(answers: any) {
            return answers.todoOptions === Operation.Create
        }
    },
    {
        type: 'rawlist',
        name: 'todo',
        message: 'Your TODOs:',
        choices: todos,
        when(answers: any) {
            return answers.todoOptions === Operation.Read
        }
    },
    {
        type: 'rawlist',
        name: 'todoAction',
        message: 'Enter your somnething:',
        choices: [Operation.Update, Operation.Delete, Operation.Continue],
        when(answers: any) {
            return mytodos.getTodos().includes(answers.todo)
        }
    },
    {
        type: 'input',
        name: 'newTodo',
        message: 'Enter your updated TODO:',
        when(answers: any) {
            return answers.todoAction === Operation.Update
        }
    },
]

const run = async () => {
    try {
        const answers = await inquirer.prompt(questions)

        switch (answers.todoOptions) {
            case Operation.Create:
                if (answers.createTodo) {
                    await mytodos.addTodo(answers.createTodo)
                }
                break
            case Operation.Quit:
                console.log('Bye bye then!')
                process.exit()
        }

        switch (answers.todoAction) {
            case Operation.Read:
                if (answers.todo && answers.newTodo) {
                    mytodos.updateTodo(answers.todo, answers.newTodo)
                }
                break
            case Operation.Delete:
                if (mytodos.getTodos().indexOf(answers.todo)) {
                    mytodos.deleteTodo(answers.todo)
                }
                break
        }
    }
    catch (error: any) {
        console.log(error)
    }
}

(async () => {
    const connection: Connection = await createConnection()
    while (true) {
        await run()
    }
})()
