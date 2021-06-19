const jsonServer = require('json-server'),
    server = jsonServer.create(),
    middlewares = jsonServer.defaults(),
    fs = require('fs');

function loadRoutes () {
    const resources = fs.readdirSync('./mock/');
    let obj = {};

    resources.forEach(resource => Object.assign(obj, require(`./mock/${resource}`)));

    fs.writeFileSync('index.json', JSON.stringify(obj), 'utf-8');

    server.use(jsonServer.router(`index.json`))
}

server.use(middlewares);

loadRoutes();

server.listen(process.env.PORT || 4444, () => {
  console.log('JSON Server is running');
});