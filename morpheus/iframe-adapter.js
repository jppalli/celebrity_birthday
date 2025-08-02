// iframe-adapter.js - Helps the game work in iframe environments like Arkadium sandbox

(function() {
    console.log('Iframe adapter initializing...');
    
    // Function to check if we're in an iframe
    function isInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true; // If we can't access parent, we're likely in a cross-origin iframe
        }
    }
    
    // Function to make the game visible in iframe
    function makeGameVisible() {
        console.log('Making game visible in iframe...');
        
        // Force document and body to be visible
        document.documentElement.style.cssText = 'height:100% !important; width:100% !important; overflow:visible !important; display:block !important;';
        document.body.style.cssText = 'height:100% !important; width:100% !important; margin:0 !important; padding:0 !important; overflow:visible !important; display:block !important; visibility:visible !important; opacity:1 !important;';
        
        // Find the game container
        const container = document.querySelector('.container');
        if (container) {
            container.style.cssText = 'display:block !important; visibility:visible !important; opacity:1 !important; position:static !important; z-index:9999 !important; width:100% !important; height:auto !important; min-height:100vh !important;';
        }
        
        // Find and show the menu screen
        const menuScreen = document.getElementById('menu-screen');
        if (menuScreen) {
            menuScreen.style.cssText = 'display:block !important; visibility:visible !important; opacity:1 !important;';
        }
        
        // Hide any loading screens or overlays
        const possibleOverlays = document.querySelectorAll('.loading, .overlay, .loader, [id*="loading"], [class*="loading"]');
        possibleOverlays.forEach(overlay => {
            overlay.style.cssText = 'display:none !important; visibility:hidden !important;';
        });
        
        console.log('Game visibility enforced');
    }
    
    // Function to notify parent frame that game is ready
    function notifyParentFrame() {
        try {
            if (window.parent && window.parent !== window) {
                console.log('Notifying parent frame that game is ready');
                window.parent.postMessage({
                    type: 'GAME_READY',
                    game: 'WordMorph',
                    status: 'ready'
                }, '*');
            }
        } catch (e) {
            console.log('Could not communicate with parent frame:', e);
        }
    }
    
    // Check if we're in an iframe and apply fixes
    if (isInIframe()) {
        console.log('Game detected in iframe environment');
        
        // Apply fixes when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', function() {
                makeGameVisible();
                notifyParentFrame();
            });
        } else {
            makeGameVisible();
            notifyParentFrame();
        }
        
        // Apply fixes again after everything is loaded
        window.addEventListener('load', function() {
            setTimeout(makeGameVisible, 500);
            setTimeout(makeGameVisible, 1000);
            setTimeout(makeGameVisible, 2000);
        });
        
        // Listen for messages from parent frame
        window.addEventListener('message', function(event) {
            if (event.data && event.data.type === 'SHOW_GAME') {
                makeGameVisible();
            }
        });
    } else {
        console.log('Game running in standard environment (not iframe)');
    }
})();