import inquirer from 'inquirer'
import Todos from "./Todos";

inquirer
    .prompt([
        {
            type: 'input',
            name: 'todoValue',
            message: "Enter you to do",
        },
        {
            type: 'input',
            name: 'todoList',
            message: "2. Display TodoList",
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