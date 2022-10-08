const readline = require('readline')
const fs = require('fs')

console.log("Welcome to Todo CLI!");
console.log("----------------"); 

console.log("(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todoList = []

rl.on('line', data => {
    switch (data[0]) {
        case 'v':
            console.log(printList())
            console.log("(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit");
            break;
        
        case 'n':
            rl.question("What?\n", task => {
                todoList.push(addTasks(task))
                console.log("(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit");
            })
            break;
            
        case 'c':
            completedTask(data[1]);
            console.log("(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit");
            break;
            
        case 'd':
            deleteTask(data[1])
            console.log("(v) View \u2022 (n) New \u2022 (cX) Complete \u2022 (dX) Delete \u2022 (q) Quit");
            break;

        case 'q':
            rl.close()
            break;
    }
})

rl.on('close', () => {
    console.log("See you soon ");
})

function addTasks(string) {
    return {
        completed: false,
        name: string
    }
}

function printList() {
    if(todoList.length === 0) {
        return "List is empty..."
    }
    let msg = ""
    for (let i = 0; i < todoList.length; i++) {
        if (todoList[i].completed) {
            msg += (i + '[\u2713]' + todoList[i].name)
        }else {
            msg += (i + '[ ]' + todoList[i].name)
        }
        msg += '\n'
        
    }
    return msg
}

function completedTask(num) {
    const i = parseInt(num)

    todoList[i].completed = true

    console.log('Completed "' + todoList[i].name + '"');
}

function deleteTask(num) {
    const i = parseInt(num)
    const name = todoList[i].name

    todoList.splice(i, 1)
    console.log("Deleted" + "\"" + name + "\"");
}

