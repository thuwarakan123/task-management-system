const components = require('./components')
const taskPath = require('./paths/task')
const authPath = require('./paths/auth')
const userPath = require('./paths/users')

const doc = {
  openapi: '3.0.0',
  info: {
    title: 'Task Management System',
    version: '1.0.0',
    description: 'API documentation for task management',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  components,
  paths: {
    ...authPath,
    ...userPath,
    ...taskPath,
  },
};

module.exports = doc;

  