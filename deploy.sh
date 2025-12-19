#!/bin/bash

# Deployment helper script for Hostinger

echo "Building Next.js app..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "Build successful!"
echo ""
echo "Next steps on Hostinger:"
echo "1. Upload all files to /home/u108930548/domains/gofamintrpt.org/public_html"
echo "2. Make sure these are included: .next/, node_modules/, public/, server.js, .htaccess, package.json"
echo "3. Run: npm install --production"
echo "4. Restart Node.js app in Hostinger control panel"
echo "5. Check /home/u108930548/domains/gofamintrpt.org/public_html/server.log for errors"
