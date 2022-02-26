import fs from "fs"
import { v4 as genId } from 'uuid';

const FILENAME = 'db.json';

export const readFile = filename => JSON.parse(fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' }))
export const writeFile = (filename, data) => fs.writeFileSync(filename, JSON.stringify(data, null, 4), { encoding: 'utf8', flag: 'w' })


export const addTask = (params) => {
    const { todo, status = false } = params
    let filedata;
    try {
        filedata = readFile(FILENAME)
    } catch (err) {
        filedata = []
    }
    const taskstatus = status ? "Completed" : "Incomplete"
    const data = {
        id: genId(),
        todo,
        status: taskstatus,
    }
    filedata.push(data)
    writeFile(FILENAME, filedata)
    console.log("New task has been added successfully!");
}

export const showTask = _ => {
    const data = readFile(FILENAME);
    console.table(data)
}

export const getTask = params => {
    const { id } = params;
    const data = readFile(FILENAME);
    const filterdata = data.filter(d => d.id === id)
    if (!filterdata.length) return console.log(`No todo item with id: ${id}`);
    console.table(filterdata)
}
export const removeTask = params => {
    const { id } = params;
    const data = readFile(FILENAME);
    const filterdata = data.filter(d => d.id !== id)
    if (!filterdata.length) return console.log(`No todo item with id: ${id}`);
    writeFile(FILENAME, filterdata)
    console.log(`TODO item with ${id} is deleted`)
}
export const updateTask = params => {
    const { id, status, todo } = params;
    const data = readFile(FILENAME);
    const index = data.findIndex(obj => obj.id === id)
    const taskstatus = status ? "Completed" : "Incomplete"
    data[index]['status'] = taskstatus
    if (!todo) data[index]['todo'] = todo
    writeFile(FILENAME, data)
    console.log(`TODO item with ${id} is updated`)
}
