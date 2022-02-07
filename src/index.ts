import inquirer from 'inquirer'
import Todos from './Todos'

const mytodos = new Todos()

// https://github.com/SBoudrias/Inquirer.js#reactive-interface
// https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/recursive.js
const questions: inquirer.QuestionCollection<any> = [
    {
        type: 'rawlist',
        name: 'todoOptions',
        message: 'Choose an Option:',
        choices: ['Create a TODO', 'List your TODOs', 'Quit'],
    },
    {
        type: 'input',
        name: 'createTodo',
        message: 'Enter your TODO:',
        when (answers: any) {
            // Only run if user answered 'Create a TODO' to the first prompt
            return answers.todoOptions === 'Create a TODO'
        }
    }
]

inquirer.ui.Prompt

const run = async () => {
    try {
        const answers = await inquirer.prompt(questions)
        
        switch (answers.todoOptions) {
            case 'List your TODOs':
                mytodos.getTodos().map((todo, index) => {
                    console.log(`${index + 1}) ${todo}`)
                })
                run()
                return
            case 'Create a TODO':
                mytodos.addTodo(answers.createTodo)
                run()
                return
            default:
                console.log('Bye bye then!')   
        }
    }
    catch(error: any) {
        console.log(error)
    }
}

run()
