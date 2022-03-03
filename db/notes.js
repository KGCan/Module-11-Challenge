const util = require ("util");
const fs = require ("fs");

// Using the uuid package to generate unique id's
const uuidPkg = require ("uuid/v1");

const readFileAsync = util.promisify(fs.readFile); 
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(task) {
        return writeFileAsync("db.db.json", JSON.stringify(task));
    }

    getTasks() {
        return this.read().then((tasks) => {
            let parsedTasks;

            try {
                parsedTasks = [].contact(JSON.parse(tasks));
            } catch (err) {
                parsedTasks = [];
            }
            return parsedTasks;
        });
    }

    addTask(task) {
        const { title, text } = task;
        
        if (!title || !text) {
            throw new Error("Task title and information must be completed");
        }

        const newTask = { title, text, id:uuidv1() };

        return this.getTasks()
        .then((tasks) => [...tasks, newTask])
        .then((updatedTasks) => this.write(updatedTasks))
        .then(() => newTask);
    }

    removeTask(id) {
        return this.getTasks()
        .then((tasks) => tasks.filter((task) => task.id !== id))
        .then((sortedTasks) => this.write (sortedTasks));
    }
}

module.exports = new Notes();