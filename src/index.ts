import inquirer from 'inquirer'
import Todos from "./Todos";

// https://github.com/SBoudrias/Inquirer.js#reactive-interface
// https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/recursive.js
const questions = [
    {
        type: 'list',
        name: 'todoOptions',
        message: 'Choose an Option:',
        choices: ['List your TODOs', 'Add to your TODOs', 'Quit'],
    },
    {
        type: 'input',
        name: 'addAnotherTodo',
        message: "Enter another TODO? (Y/n)",
        when: function( answers: any ) {
            // Only run if user answered Pizza to the first prompt
            return answers.todoOptions === "Add to your TODOs"
        }
    },
];

const mytodos = new Todos();

const run = async () => {
    try {
        const answers = await inquirer.prompt(questions);

        
        switch (answers.todoOptions) {
            case 'List your TODOs':
                console.log(mytodos.getTodos());
                break;
            // case 'Add to your TODOs':
            //     inquirer.next(
            //         {
            //             type: 'input',
            //             name: 'todoValue',
            //             message: "Enter your TODO",
            //     });
            //     mytodos.addTodo(answers.todoValue);
            //     break;
            // default:
            //     console.log('bye bye then');
            //     process.abort();
                
        }

        if (answers.addAnotherTodo === 'Y') {
            console.log('taco', answers.addAnotherTodo)
            mytodos.addTodo(answers.addAnotherTodo);
        }
    }
    catch(error: any) {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    }
}

run()
