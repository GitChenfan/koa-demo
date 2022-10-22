import * as Koa from 'koa'
import * as staticServer from "koa-static2";
import * as path from 'path';
import * as koaBody from 'koa-body';
import * as http from 'http';
import {router} from './router';

import * as onerror from 'koa-onerror'
import * as logger from 'koa-logger'
var debug = require('debug')('demo:server');


const app = new Koa()

onerror(app)

app.use(koaBody())
app.use(logger())
app.use(staticServer("/", path.join(__dirname + '../public')))

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  await next()
  const ms = new Date().getTime() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


var port = normalizePort(process.env.PORT || '3000');
var server = http.createServer(app.callback());

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
