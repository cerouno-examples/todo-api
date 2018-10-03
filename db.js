var Sequelize = require('sequelize');

var sequelize = new Sequelize('null', 'null', 'null', {
  dialect: 'sqlite',
  storage: 'test.sqlite'
});

var Todo = sequelize.define('todos', {
	name: { type: Sequelize.STRING }
});

sequelize.sync()


module.exports = {
	Todo
}
