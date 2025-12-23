#!/bin/sh
# Startup script for Surotaste server
# Fixes AdminJS bundling issue by replacing runtime bundle with pre-built version

echo "🚀 Starting Surotaste Server..."

# Copy pre-built bundle to .adminjs/ before server starts
if [ -f "/app/.adminjs-prebuilt/components.bundle.js" ]; then
  mkdir -p /app/.adminjs
  cp /app/.adminjs-prebuilt/components.bundle.js /app/.adminjs/components.bundle.js
  # Also copy as bundle.js to override the bundler output
  cp /app/.adminjs-prebuilt/components.bundle.js /app/.adminjs/bundle.js
  echo "✅ Using pre-built components.bundle.js ($(wc -c < /app/.adminjs/components.bundle.js) bytes)"
fi

# Start server in background
node server.js &
SERVER_PID=$!

# Wait for AdminJS to finish bundling (about 3 seconds), then replace again
sleep 5

# Replace the runtime-generated bundle with our pre-built one
if [ -f "/app/.adminjs-prebuilt/components.bundle.js" ]; then
  cp /app/.adminjs-prebuilt/components.bundle.js /app/.adminjs/bundle.js
  echo "✅ Replaced runtime bundle.js with pre-built version"
fi

# Wait for server process
wait $SERVER_PID
