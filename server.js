#!/usr/bin/env node

const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';

// Log for debugging
const logFile = path.join(__dirname, 'server.log');
const log = (msg) => {
  console.log(`[${new Date().toISOString()}] ${msg}`);
  fs.appendFileSync(logFile, `[${new Date().toISOString()}] ${msg}\n`);
};

try {
  log('Starting server...');
  
  const app = next({ dev: false, dir: __dirname });
  const handle = app.getRequestHandler();

  app.prepare().then(() => {
    const port = process.env.PORT || 3000;
    
    const server = createServer((req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        handle(req, res, parsedUrl);
      } catch (err) {
        log(`Error handling request: ${err.message}`);
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });

    server.listen(port, '127.0.0.1', () => {
      log(`Server ready on port ${port}`);
    });

    server.on('error', (err) => {
      log(`Server error: ${err.message}`);
      process.exit(1);
    });
  }).catch((err) => {
    log(`Failed to start app: ${err.message}`);
    log(`Stack: ${err.stack}`);
    process.exit(1);
  });
} catch (err) {
  log(`Fatal error: ${err.message}`);
  log(`Stack: ${err.stack}`);
  process.exit(1);
}

