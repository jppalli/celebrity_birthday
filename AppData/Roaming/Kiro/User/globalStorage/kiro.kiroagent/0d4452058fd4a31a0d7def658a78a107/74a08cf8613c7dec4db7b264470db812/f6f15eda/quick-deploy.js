#!/usr/bin/env node
/**
 * Quick deploy solution for Arkadium sandbox testing
 * This creates a simple deployment package
 */

const fs = require('fs');
const path = require('path');

function createDeploymentPackage() {
    console.log('📦 Creating deployment package for Word Quest...\n');
    
    // Files to include in deployment
    const filesToCopy = [
        'index.html',
        'game.js', 
        'words.js',
        'style.css'
    ];
    
    // Create deploy directory
    const deployDir = 'deploy';
    if (!fs.existsSync(deployDir)) {
        fs.mkdirSync(deployDir);
    }
    
    // Copy files
    filesToCopy.forEach(file => {
        if (fs.existsSync(file)) {
            fs.copyFileSync(file, path.join(deployDir, file));
            console.log(`✅ Copied ${file}`);
        } else {
            console.log(`⚠️  ${file} not found`);
        }
    });
    
    // Create a simple README for deployment
    const readmeContent = `# Word Quest - Deployment Package

## Quick Deploy Options:

### 1. Netlify Drop (Easiest)
1. Go to: https://app.netlify.com/drop
2. Drag this entire 'deploy' folder to the drop zone
3. Get instant public URL
4. Use that URL in Arkadium sandbox

### 2. Vercel
1. Install: npm install -g vercel
2. Run: vercel --prod
3. Get public URL

### 3. GitHub Pages
1. Create new GitHub repo
2. Upload these files
3. Enable GitHub Pages in settings
4. Use: https://yourusername.github.io/reponame

### 4. Surge.sh
1. Install: npm install -g surge
2. Run: surge
3. Get public URL

## Testing with Arkadium Sandbox:
1. Go to: https://arkadiumsdk.z19.web.core.windows.net/sandbox
2. Enter your public URL
3. Click "Load Game"
4. Test SDK integration

## Files included:
${filesToCopy.map(f => `- ${f}`).join('\n')}
`;
    
    fs.writeFileSync(path.join(deployDir, 'README.md'), readmeContent);
    
    console.log(`\n📁 Deployment package created in '${deployDir}' folder`);
    console.log('\n🚀 Quick deployment options:');
    console.log('1. Netlify Drop: https://app.netlify.com/drop');
    console.log('2. Vercel: npm install -g vercel && vercel');
    console.log('3. Surge: npm install -g surge && surge');
    console.log('\n💡 Just drag the deploy folder to Netlify Drop for instant hosting!');
}

function showTunnelInstructions() {
    console.log('\n🌐 Alternative: Create a tunnel to your localhost');
    console.log('\n📋 Tunnel Options:');
    
    console.log('\n1. Ngrok (Recommended):');
    console.log('   - Download: https://ngrok.com/download');
    console.log('   - Run: ngrok http 8000');
    console.log('   - Copy the https URL');
    
    console.log('\n2. Localtunnel:');
    console.log('   - Install: npm install -g localtunnel');
    console.log('   - Run: lt --port 8000');
    console.log('   - Copy the URL');
    
    console.log('\n3. Serveo (No install needed):');
    console.log('   - Run: ssh -R 80:localhost:8000 serveo.net');
    console.log('   - Copy the URL from output');
    
    console.log('\n4. Cloudflare Tunnel:');
    console.log('   - Install: npm install -g cloudflared');
    console.log('   - Run: cloudflared tunnel --url http://localhost:8000');
    console.log('   - Copy the trycloudflare.com URL');
}

function main() {
    console.log('🎯 Word Quest - Arkadium Sandbox Setup Helper\n');
    
    const args = process.argv.slice(2);
    
    if (args.includes('--deploy') || args.includes('-d')) {
        createDeploymentPackage();
    } else if (args.includes('--tunnel') || args.includes('-t')) {
        showTunnelInstructions();
    } else {
        console.log('❌ The issue: Arkadium sandbox cannot access localhost URLs');
        console.log('✅ The solution: You need a PUBLIC URL\n');
        
        console.log('Choose an option:');
        console.log('1. Create deployment package: node quick-deploy.js --deploy');
        console.log('2. Show tunnel instructions: node quick-deploy.js --tunnel');
        console.log('\nRecommended: Use option 1 with Netlify Drop for instant hosting!');
    }
}

main();