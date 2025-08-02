#!/usr/bin/env node
/**
 * Expose Word Quest game server publicly for Arkadium sandbox testing
 * This script creates a public tunnel to your localhost server using Node.js
 */

const { spawn, exec } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

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

function checkCommand(command) {
    return new Promise((resolve) => {
        exec(`${command} --version`, (error) => {
            resolve(!error);
        });
    });
}

function startLocalServer() {
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

        // Parse URL and get file path
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './index.html';
        }

        // Get file extension
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeType = mimeTypes[extname] || 'application/octet-stream';

        // Log requests for debugging
        console.log(`[${req.connection.remoteAddress}] ${req.method} ${req.url}`);

        // Read and serve file
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code === 'ENOENT') {
                    res.writeHead(404, { 
                        'Content-Type': 'text/html',
                        ...corsHeaders
                    });
                    res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                } else {
                    res.writeHead(500, corsHeaders);
                    res.end(`Server Error: ${error.code}`, 'utf-8');
                }
            } else {
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
        console.log(`📍 Local server running at: http://localhost:${PORT}`);
    });

    return server;
}

async function startNgrokTunnel(port) {
    console.log(`🌐 Starting ngrok tunnel for port ${port}...`);
    
    return new Promise((resolve) => {
        const ngrok = spawn('ngrok', ['http', port.toString()]);
        
        // Wait for ngrok to start
        setTimeout(async () => {
            try {
                // Get tunnel info from ngrok API
                const response = await fetch('http://localhost:4040/api/tunnels');
                const data = await response.json();
                
                if (data.tunnels && data.tunnels.length > 0) {
                    const publicUrl = data.tunnels[0].public_url;
                    console.log(`✅ Public URL: ${publicUrl}`);
                    console.log(`🎯 Use this URL in Arkadium sandbox: ${publicUrl}`);
                    resolve({ url: publicUrl, process: ngrok });
                } else {
                    console.log('⚠️  Ngrok started but no tunnels found');
                    console.log('   Check http://localhost:4040 for ngrok dashboard');
                    resolve({ url: null, process: ngrok });
                }
            } catch (error) {
                console.log('⚠️  Ngrok started but couldn\'t get tunnel info');
                console.log('   Check http://localhost:4040 for ngrok dashboard');
                resolve({ url: null, process: ngrok });
            }
        }, 3000);
    });
}

async function startLocaltunnel(port) {
    console.log(`🌐 Starting localtunnel for port ${port}...`);
    
    return new Promise((resolve) => {
        const lt = spawn('lt', ['--port', port.toString(), '--subdomain', 'wordquest']);
        
        let output = '';
        
        lt.stdout.on('data', (data) => {
            output += data.toString();
            const match = output.match(/your url is: (https:\/\/[^\s]+)/);
            if (match) {
                const publicUrl = match[1];
                console.log(`✅ Public URL: ${publicUrl}`);
                console.log(`🎯 Use this URL in Arkadium sandbox: ${publicUrl}`);
                resolve({ url: publicUrl, process: lt });
            }
        });
        
        lt.stderr.on('data', (data) => {
            console.log('Localtunnel:', data.toString());
        });
        
        // Timeout after 10 seconds
        setTimeout(() => {
            if (!output.includes('your url is:')) {
                console.log('⚠️  Localtunnel timeout - check output above');
                resolve({ url: null, process: lt });
            }
        }, 10000);
    });
}

function openBrowser(url) {
    const start = process.platform === 'darwin' ? 'open' : 
                  process.platform === 'win32' ? 'start' : 'xdg-open';
    exec(`${start} ${url}`);
}

async function main() {
    console.log('🚀 Word Quest - Public Server Exposer (Node.js)');
    console.log('   This will make your game accessible to Arkadium sandbox\n');
    
    // Start local server
    const server = startLocalServer();
    
    let publicUrl = null;
    let tunnelProcess = null;
    
    // Try ngrok first
    const hasNgrok = await checkCommand('ngrok');
    if (hasNgrok) {
        const result = await startNgrokTunnel(PORT);
        publicUrl = result.url;
        tunnelProcess = result.process;
    } else {
        console.log('⚠️  Ngrok not found, trying localtunnel...');
        
        const hasLt = await checkCommand('lt');
        if (hasLt) {
            const result = await startLocaltunnel(PORT);
            publicUrl = result.url;
            tunnelProcess = result.process;
        } else {
            console.log('❌ Neither ngrok nor localtunnel found');
            console.log('\n📦 Install options:');
            console.log('   Ngrok: https://ngrok.com/download');
            console.log('   Localtunnel: npm install -g localtunnel');
            console.log('\n🔄 Falling back to localhost only...');
        }
    }
    
    // Show results
    if (publicUrl) {
        console.log(`\n✅ Game is now publicly accessible!`);
        console.log(`🌐 Public URL: ${publicUrl}`);
        console.log(`🏠 Local URL: http://localhost:${PORT}`);
        console.log(`\n📋 Instructions for Arkadium Sandbox:`);
        console.log(`   1. Go to: https://arkadiumsdk.z19.web.core.windows.net/sandbox`);
        console.log(`   2. Enter this URL: ${publicUrl}`);
        console.log(`   3. Click 'Load Game' to test SDK integration`);
        
        // Open browsers
        setTimeout(() => {
            openBrowser(`http://localhost:${PORT}`);
            setTimeout(() => {
                openBrowser('https://arkadiumsdk.z19.web.core.windows.net/sandbox');
            }, 1000);
        }, 1000);
    } else {
        console.log(`\n⚠️  Running in localhost-only mode`);
        console.log(`🏠 Local URL: http://localhost:${PORT}`);
        
        setTimeout(() => {
            openBrowser(`http://localhost:${PORT}`);
        }, 1000);
    }
    
    console.log(`\n⏹️  Press Ctrl+C to stop all servers`);
    
    // Handle cleanup
    process.on('SIGINT', () => {
        console.log(`\n🛑 Stopping servers...`);
        server.close();
        if (tunnelProcess) {
            tunnelProcess.kill();
        }
        process.exit(0);
    });
}

// Add fetch polyfill for older Node.js versions
if (!global.fetch) {
    global.fetch = require('http').get;
}

main().catch(console.error);