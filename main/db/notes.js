const util = require('util');
const fs = require('fs');

// Use the uuid package to get ids
const uuidv1 = require('uuid/v1');

// Read & write file variables
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(task) {
    return writeFileAsync('db/db.json', JSON.stringify(task));
  }

  getTasks() {
    return this.read().then((tasks) => {
      let parsedTasks;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedTasks = [].concat(JSON.parse(tasks));
      } catch (err) {
        parsedTasks = [];
      }

      return parsedTasks;
    });
  }

  addTask(task) {
    const { title, text } = task;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const newTask = { title, text, id: uuidv1() };

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getTasks()
      .then((tasks) => [...tasks, newTask])
      .then((updatedTasks) => this.write(updatedTasks))
      .then(() => newTask);
  }

  removeTask(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getTasks()
      .then((tasks) => tasks.filter((task) => task.id !== id))
      .then((filteredTasks) => this.write(filteredTasks));
  }
}

module.exports = new Notes();
