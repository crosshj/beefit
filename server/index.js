const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
	static: '../'
});
const port = 3000;

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now();
	}
	next();
});

server.use(middlewares);
server.use('/api', router);

server.listen(port, () => {
	console.log(`Beefit Server running at http://localhost:${port}`);
});
