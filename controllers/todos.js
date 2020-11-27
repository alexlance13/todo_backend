const models = require('../database/models');
const fs = require('fs');
const path = require('path');

async function create(req, res) {
  const { title, text } = req.body;
  const todo = { title, text };
  console.log(req.body);
  if (req.session.imageName) todo.imageName = req.session.imageName;
  const result = await models.todo.create(todo);
  console.log(`Todo ${result} is added`);
  res.send(result);
}

async function remove(req, res) {
  try {
    const todo = await models.todo.findByIdAndDelete(req.params.id);
    if (todo.imageName) {
      const path1 = path.resolve(__dirname, '../tmp/images', todo.imageName);
      await fs.unlinkSync(path1);
    }
    console.log(`todo ${todo._id} successfully deleted`);
    res.send(todo);
  } catch (error) {
    console.error('RemovingTodoError', error);
  }
}

async function getAll(req, res) {
  const todos = await models.todo.find();
  res.send(todos);
}

module.exports = {
  create,
  remove,
  getAll,
};
