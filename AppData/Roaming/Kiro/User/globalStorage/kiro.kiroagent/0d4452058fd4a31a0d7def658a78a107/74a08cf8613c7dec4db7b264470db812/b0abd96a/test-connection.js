#!/usr/bin/env node
/**
 * Test connection to help debug Arkadium sandbox issues
 */

const http = require('http');
const { exec } = require('child_process');
const os = require('os');

function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const interface of interfaces[name]) {
            if (interface.family === 'IPv4' && !interface.internal) {
                return interface.address;
            }
        }
    }
    return 'localhost';
}

function testServer(host, port) {
    return new Promise((resolve) => {
        const req = http.get(`http://${host}:${port}`, (res) => {
            resolve({ success: true, status: res.statusCode });
        });
        
        req.on('error', (err) => {
            resolve({ success: false, error: err.message });
        });
        
        req.setTimeout(5000, () => {
            req.destroy();
            resolve({ success: false, error: 'Timeout' });
        });
    });
}

async function main() {
    console.log('🔍 Testing Word Quest Server Connection\n');
    
    const port = 8000;
    const localIP = getLocalIP();
    
    console.log('📍 Testing different URLs:');
    
    // Test localhost
    console.log('1. Testing localhost...');
    const localhostResult = await testServer('localhost', port);
    console.log(`   http://localhost:${port} - ${localhostResult.success ? '✅ OK' : '❌ ' + localhostResult.error}`);
    
    // Test 127.0.0.1
    console.log('2. Testing 127.0.0.1...');
    const loopbackResult = await testServer('127.0.0.1', port);
    console.log(`   http://127.0.0.1:${port} - ${loopbackResult.success ? '✅ OK' : '❌ ' + loopbackResult.error}`);
    
    // Test local IP
    if (localIP !== 'localhost') {
        console.log('3. Testing local network IP...');
        const localResult = await testServer(localIP, port);
        console.log(`   http://${localIP}:${port} - ${localResult.success ? '✅ OK' : '❌ ' + localResult.error}`);
    }
    
    console.log('\n📋 Results:');
    
    if (localhostResult.success) {
        console.log('✅ Local server is running correctly');
        console.log('❌ But Arkadium sandbox CANNOT access localhost URLs');
        console.log('\n💡 Solutions:');
        console.log('   1. Use ngrok: ngrok http 8000');
        console.log('   2. Use localtunnel: lt --port 8000');
        console.log('   3. Deploy to a public host (Netlify, Vercel, etc.)');
        
        if (localIP !== 'localhost') {
            console.log(`   4. Try local network IP: http://${localIP}:${port}`);
            console.log('      (Only works if Arkadium sandbox is on same network)');
        }
    } else {
        console.log('❌ Local server is not running');
        console.log('💡 Start your server first: node server.js');
    }
    
    console.log('\n🌐 For Arkadium sandbox testing, you MUST use a public URL');
    console.log('   Sandbox URL: https://arkadiumsdk.z19.web.core.windows.net/sandbox');
}

main().catch(console.error);