#!/usr/bin/env node

process.env.NODE_ENV = 'production';

const { createServer } = require('http');
const { parse } = require('url');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const hostname = 'localhost';

let nextApp;
let handler;

async function startServer() {
  try {
    // Import Next.js
    const next = require('next');
    
    const dir = path.join(__dirname);
    console.log(`Starting from directory: ${dir}`);
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    
    // Create Next.js app
    nextApp = next({ dev: false, dir });
    handler = nextApp.getRequestHandler();
    
    // Prepare the app
    await nextApp.prepare();
    console.log('Next.js app prepared successfully');
    
    // Create HTTP server
    const server = createServer((req, res) => {
      const parsedUrl = parse(req.url, true);
      handler(req, res, parsedUrl);
    });
    
    server.listen(PORT, hostname, () => {
      console.log(`✓ Server running on http://${hostname}:${PORT}`);
      console.log(`✓ Ready to accept connections`);
    });
    
    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    console.error(error.stack);
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer();




