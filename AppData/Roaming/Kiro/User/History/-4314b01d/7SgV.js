#!/usr/bin/env node
/**
 * Simple Node.js HTTP server for Word Quest game
 * Run with: node server.js
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 8000;

// MIME types for different file extensions
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    // Add comprehensive CORS headers for Arkadium sandbox
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, HEAD',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    };

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(200, corsHeaders);
        res.end();
        return;
    }

    // Parse URL and get file path - handle query parameters
    const url = new URL(req.url, `http://${req.headers.host}`);
    let filePath = '.' + url.pathname;
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Normalize the path to prevent directory traversal
    filePath = path.normalize(filePath);

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeType = mimeTypes[extname] || 'application/octet-stream';

    // Log requests for debugging with more detail
    const timestamp = new Date().toLocaleTimeString();
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const referer = req.headers['referer'] || 'Direct';
    
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log(`  └─ From: ${req.connection.remoteAddress}`);
    console.log(`  └─ User-Agent: ${userAgent.substring(0, 50)}...`);
    console.log(`  └─ Referer: ${referer}`);
    console.log(`  └─ Resolved file path: ${filePath}`);
    console.log(`  └─ File exists: ${fs.existsSync(filePath)}`);

    // Read and serve file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 
                    'Content-Type': 'text/html',
                    ...corsHeaders
                });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500, corsHeaders);
                res.end(`Server Error: ${error.code}`, 'utf-8');
            }
        } else {
            // Success
            res.writeHead(200, { 
                'Content-Type': mimeType,
                ...corsHeaders
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('🎮 Word Quest Game Server');
    console.log(`📍 Server running at: http://localhost:${PORT}`);
    console.log('🌐 Opening browser...');
    console.log('⏹️  Press Ctrl+C to stop the server');
    
    // Open browser automatically
    const start = process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} http://localhost:${PORT}`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`❌ Port ${PORT} is already in use. Try a different port or stop the existing server.`);
    } else {
        console.log(`❌ Server error: ${err.message}`);
    }
    process.exit(1);
});