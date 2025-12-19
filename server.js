#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname)

process.env.NODE_ENV = 'production'
process.chdir(__dirname)

const currentPort = parseInt(process.env.PORT, 10) || 3000
// For Passenger, listen on all interfaces
const hostname = '0.0.0.0'

let keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10)

// Read the config file
const requiredServerFilesPath = path.join(dir, '.next', 'required-server-files.json')

if (!fs.existsSync(requiredServerFilesPath)) {
  console.error(`Error: ${requiredServerFilesPath} not found. Run 'npm run build' first.`)
  process.exit(1)
}

const nextConfig = require(requiredServerFilesPath).config

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

const { startServer } = require('next/dist/server/lib/start-server')

if (
  Number.isNaN(keepAliveTimeout) ||
  !Number.isFinite(keepAliveTimeout) ||
  keepAliveTimeout < 0
) {
  keepAliveTimeout = undefined
}

console.log(`Starting Next.js server on ${hostname}:${currentPort}`)

startServer({
  dir,
  isDev: false,
  config: nextConfig,
  hostname,
  port: currentPort,
  allowRetry: false,
  keepAliveTimeout,
}).catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});



