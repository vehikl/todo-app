import inquirer from 'inquirer'
import Todos from "./Todos";

// https://github.com/SBoudrias/Inquirer.js#reactive-interface
// https://github.com/SBoudrias/Inquirer.js/blob/master/packages/inquirer/examples/recursive.js
inquirer
    .prompt([
        {
            type: 'input',
            name: 'todoValue',
            message: "Enter your TODO",
        },
        {
            type: 'input',
            name: 'todoList',
            message: "2. Display TODO List",
        },
    ])
    .then((answers) => {
        const mytodos = new Todos();
        mytodos.addTodo(answers.todoValue);

        if (answers.todolist === 'yes') {
            console.log(mytodos.getTodos());
        } else {
            console.log('bye bye then');
        }
    })
    .catch((error) => {
        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }
    });