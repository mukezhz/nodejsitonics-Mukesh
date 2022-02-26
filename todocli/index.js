import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addTask, showTask, getTask, removeTask, updateTask } from './utils/index.mjs'

// definition of add command
const yargv = yargs(hideBin(process.argv))

yargv
    .command({
        command: 'add --todo="<todo-item>"',
        alias: 'add',
        description: 'This command will add todo item',
        handler: (argv) => {
            addTask(argv)
        },
        builder: {
            todo: {
                describe: 'The name of the todo item',
                type: "string",
                demandOption: true,
            },
            status: {
                describe: 'The status of the todo',
                type: "boolean",
                demandOption: false,
            },
        }
    })

    .command({
        command: 'list',
        alias: 'list',
        description: 'This command will show todo items',
        handler: (argv) => {
            showTask(argv)
        },
    })

    .command({
        command: 'get --id="<todo-id>"',
        alias: 'get',
        description: 'This command will show todo items',
        handler: (argv) => {
            getTask(argv)
        },
        builder: {
            id: {
                describe: 'The id of the todo item',
                type: "string",
                demandOption: true,
            },
        }
    })

    .command({
        command: 'remove --id="<todo-id>"',
        alias: 'remove',
        description: 'This command will remove todo item',
        handler: (argv) => {
            removeTask(argv)
        },
        builder: {
            id: {
                describe: 'The id of the todo item',
                type: "string",
                demandOption: true,
            },
        }
    })

    .command({
        command: 'update --id="<todo-id>" --todo="<todo-item>" --status="<bool>"',
        alias: 'update',
        description: 'This command will update status todo item',
        handler: (argv) => {
            updateTask(argv)
        },
        builder: {
            id: {
                describe: 'The id of the todo item',
                type: "string",
                demandOption: false,
            },
            status: {
                describe: 'The status of the todo item',
                type: "boolean",
                demandOption: false,
            },
        }
    }).demandCommand()
    .help('h').alias('h', 'help')
    .argv



