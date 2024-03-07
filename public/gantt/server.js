const handler = require('serve-handler');
const http = require('http');

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: 'public/gantt',
  });
});

const port = 5000;
server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
  import('open').then((open) => {
    open.default(`http://localhost:${port}`);
  });
});
