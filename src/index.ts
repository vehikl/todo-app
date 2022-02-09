import inquirer from 'inquirer'
import Todos from './Todos'

const mytodos = new Todos()

const todos = () => {
    return mytodos.getTodos()
}

const questions: inquirer.QuestionCollection<any> = [
    {
        type: 'rawlist',
        name: 'todoOptions',
        message: 'Choose an Option:',
        choices: ['CREATE', 'READ', 'Quit'],
    },
    {
        type: 'input',
        name: 'createTodo',
        message: 'Enter your TODO:',
        when(answers: any) {
            return answers.todoOptions === 'CREATE'
        }
    },
    {
        type: 'rawlist',
        name: 'todo',
        message: 'Your TODOs:',
        choices: todos,
        when(answers: any) {
            return answers.todoOptions === 'READ'
        }
    },
    {
        type: 'rawlist',
        name: 'todoAction',
        message: 'Enter your somnething:',
        choices: ['UPDATE', 'DELETE', 'Continue'],
        when(answers: any) {
            return mytodos.getTodos().includes(answers.todo)
        }
    },
    {
        type: 'input',
        name: 'newTodo',
        message: 'Enter your updated TODO:',
        when(answers: any) {
            return answers.todoAction === 'UPDATE'
        }
    },
]

const run = async () => {
    try {
        const answers = await inquirer.prompt(questions)

        switch (answers.todoOptions) {
            case 'CREATE':
                if (answers.createTodo) {
                    mytodos.addTodo(answers.createTodo)
                }
                break
            case 'Quit':
                console.log('Bye bye then!')
                process.exit()
        }

        switch (answers.todoAction) {
            case 'UPDATE':
                if (answers.todo && answers.newTodo) {
                    mytodos.updateTodo(answers.todo, answers.newTodo)
                }
                break
            case 'DELETE':
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
    while (true) {
        await run()
    }
})()
