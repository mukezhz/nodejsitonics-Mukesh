import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { addTask, showTask, getTask, removeTask, updateTask } from './utils/index.mjs'

// definition of add command
yargs(hideBin(process.argv)).command({
    command: 'add',
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
}).parse()

yargs(hideBin(process.argv)).command({
    command: 'list',
    description: 'This command will show todo items',
    handler: (argv) => {
        showTask(argv)
    },
}).parse()

yargs(hideBin(process.argv)).command({
    command: 'get',
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
}).parse()

yargs(hideBin(process.argv)).command({
    command: 'remove',
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
}).parse()

yargs(hideBin(process.argv)).command({
    command: 'update',
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
}).parse()



