var {Todo} = require('./db')
var restify = require('restify')
var server = restify.createServer()
var port = 3011

server.use(function (req, res, next) {
  var data = ''
  req.setEncoding('utf8')
  req.on('data', function (chunk) {
    data += chunk
  })
  req.on('end', function () {
    req.body = data
    console.log()
    next()
  })
})


server.opts('/todos', function (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  response.send(200)
  next()
})

server.get('/todos', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')

  Todo.findAll().then(function (songs) {
    response.send(songs)
    response.end()
  })
})

server.post('/todos', (request, response) => {
  const body = JSON.parse(request.body)
  Todo.create(body).then(todo => {
    response.send(todo)
    response.end()
  })
})

server.del('/todos/:id', (request, response) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type')
  console.log('todo id', request.params.id)
  const id = request.params.id
  Todo.findAll({id: id}).then((todos) => {
    var todo = todos[0]
    todo.destroy().then(() => {
      response.send(200)
      response.end()
    })
  })
})

server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

