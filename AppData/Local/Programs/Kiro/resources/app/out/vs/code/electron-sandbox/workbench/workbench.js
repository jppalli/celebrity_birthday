"use strict";(function(u){globalThis.MonacoBootstrapWindow=u()})(function(){const u=m(),b=u.process;Error.stackTraceLimit=100;async function S(n,a,e){const i=setTimeout(()=>{console.error("[resolve window config] Could not resolve window configuration within 10 seconds, but will continue to wait...")},1e4);performance.mark("code/willWaitForWindowConfig");const r=await u.context.resolveConfiguration();performance.mark("code/didWaitForWindowConfig"),clearTimeout(i),typeof e?.canModifyDOM=="function"&&e.canModifyDOM(r);const{forceEnableDeveloperKeybindings:f,disallowReloadKeybinding:l,removeDeveloperKeybindingsAfterLoad:d}=typeof e?.configureDeveloperSettings=="function"?e.configureDeveloperSettings(r):{forceEnableDeveloperKeybindings:!1,disallowReloadKeybinding:!1,removeDeveloperKeybindingsAfterLoad:!1},v=!!b.env.VSCODE_DEV||f;let D;v&&(D=t(l)),globalThis._VSCODE_NLS_MESSAGES=r.nls.messages,globalThis._VSCODE_NLS_LANGUAGE=r.nls.language;let w=r.nls.language||"en";w==="zh-tw"?w="zh-Hant":w==="zh-cn"&&(w="zh-Hans"),window.document.documentElement.setAttribute("lang",w),window.MonacoEnvironment={},typeof e?.beforeRequire=="function"&&e.beforeRequire(r);const B=new URL(`${p(r.appRoot,{isWindows:b.platform==="win32",scheme:"vscode-file",fallbackAuthority:"vscode-app"})}/out/`);if(globalThis._VSCODE_FILE_ROOT=B.toString(),Array.isArray(r.cssModules)&&r.cssModules.length>0){performance.mark("code/willAddCssLoader");const c=document.createElement("style");c.type="text/css",c.media="screen",c.id="vscode-css-loading",document.head.appendChild(c),globalThis._VSCODE_CSS_LOAD=function(y){c.textContent+=`@import url(${y});
`};const h={imports:{}};for(const y of r.cssModules){const E=new URL(y,B).href,x=`globalThis._VSCODE_CSS_LOAD('${E}');
`,L=new Blob([x],{type:"application/javascript"});h.imports[E]=URL.createObjectURL(L)}const g=window.trustedTypes?.createPolicy("vscode-bootstrapImportMap",{createScript(y){return y}}),C=JSON.stringify(h,void 0,2),k=document.createElement("script");k.type="importmap",k.setAttribute("nonce","0c6a828f1297"),k.textContent=g?.createScript(C)??C,document.head.appendChild(k),performance.mark("code/didAddCssLoader")}Promise.all(n.map(c=>{if(c.includes("vs/css!")){const h=c.replace("vs/css!",""),g=document.createElement("link");return g.rel="stylesheet",g.href=new URL(`${h}.css`,B).href,document.head.appendChild(g),Promise.resolve()}else return import(new URL(`${c}.js`,B).href)})).then(c=>$(c[0]),o);async function $(c){try{const h=a(c,r);h instanceof Promise&&(await h,D&&d&&D())}catch(h){o(h,v)}}}function t(n){const a=u.ipcRenderer,e=function(d){return[d.ctrlKey?"ctrl-":"",d.metaKey?"meta-":"",d.altKey?"alt-":"",d.shiftKey?"shift-":"",d.keyCode].join("")},i=b.platform==="darwin"?"meta-alt-73":"ctrl-shift-73",r="123",f=b.platform==="darwin"?"meta-82":"ctrl-82";let l=function(d){const s=e(d);s===i||s===r?a.send("vscode:toggleDevTools"):s===f&&!n&&a.send("vscode:reloadWindow")};return window.addEventListener("keydown",l),function(){l&&(window.removeEventListener("keydown",l),l=void 0)}}function o(n,a){a&&u.ipcRenderer.send("vscode:openDevTools"),console.error(`[uncaught exception]: ${n}`),n&&typeof n!="string"&&n.stack&&console.error(n.stack)}function p(n,a){let e=n.replace(/\\/g,"/");e.length>0&&e.charAt(0)!=="/"&&(e=`/${e}`);let i;return a.isWindows&&e.startsWith("//")?i=encodeURI(`${a.scheme||"file"}:${e}`):i=encodeURI(`${a.scheme||"file"}://${a.fallbackAuthority||""}${e}`),i.replace(/#/g,"%23")}function m(){return window.vscode}return{load:S}}),function(){const u=b();performance.mark("code/didStartRenderer"),u.load(["vs/workbench/workbench.desktop.main","vs/css!vs/workbench/workbench.desktop.main"],function(t,o){return performance.mark("code/didLoadWorkbenchMain"),t.main(o)},{configureDeveloperSettings:function(t){return{forceDisableShowDevtoolsOnError:typeof t.extensionTestsPath=="string"||t["enable-smoke-test-driver"]===!0,forceEnableDeveloperKeybindings:Array.isArray(t.extensionDevelopmentPath)&&t.extensionDevelopmentPath.length>0,removeDeveloperKeybindingsAfterLoad:!0}},canModifyDOM:function(t){S(t)},beforeLoaderConfig:function(t){t.recordStats=!0},beforeRequire:function(t){performance.mark("code/willLoadWorkbenchMain"),Object.defineProperty(window,"vscodeWindowId",{get:()=>t.windowId}),window.requestIdleCallback(()=>{const o=document.createElement("canvas");o.getContext("2d")?.clearRect(0,0,o.width,o.height),o.remove()},{timeout:50})}});function b(){return window.MonacoBootstrapWindow}function S(t){performance.mark("code/willShowPartsSplash");let o=t.partsSplash;o&&(t.autoDetectHighContrast&&t.colorScheme.highContrast?(t.colorScheme.dark&&o.baseTheme!=="hc-black"||!t.colorScheme.dark&&o.baseTheme!=="hc-light")&&(o=void 0):t.autoDetectColorScheme&&(t.colorScheme.dark&&o.baseTheme!=="vs-dark"||!t.colorScheme.dark&&o.baseTheme!=="vs")&&(o=void 0)),o&&t.extensionDevelopmentPath&&(o.layoutInfo=void 0);let p,m,n;o?(p=o.baseTheme,m=o.colorInfo.editorBackground,n=o.colorInfo.foreground):t.autoDetectHighContrast&&t.colorScheme.highContrast?t.colorScheme.dark?(p="hc-black",m="#000000",n="#FFFFFF"):(p="hc-light",m="#FFFFFF",n="#000000"):t.autoDetectColorScheme&&(t.colorScheme.dark?(p="vs-dark",m="#1E1E1E",n="#CCCCCC"):(p="vs",m="#FFFFFF",n="#000000"));const a=document.createElement("style");if(a.className="initialShellColors",document.head.appendChild(a),a.textContent=`body {
			background-color: ${m};
			color: ${n};
			margin: 0;
			padding: 0;
		}`,typeof o?.zoomLevel=="number"&&typeof globalThis.vscode?.webFrame?.setZoomLevel=="function"&&globalThis.vscode.webFrame.setZoomLevel(o.zoomLevel),o?.layoutInfo){const{layoutInfo:e,colorInfo:i}=o,r=document.createElement("div");r.id="monaco-parts-splash",r.className=p??"vs-dark",e.windowBorder&&i.windowBorder&&(r.setAttribute("style",`
					position: relative;
					height: calc(100vh - 2px);
					width: calc(100vw - 2px);
					border: 1px solid var(--window-border-color);
				`),r.style.setProperty("--window-border-color",i.windowBorder),e.windowBorderRadius&&(r.style.borderRadius=e.windowBorderRadius)),e.sideBarWidth=Math.min(e.sideBarWidth,window.innerWidth-(e.activityBarWidth+e.editorPartMinWidth));const f=document.createElement("div");if(f.setAttribute("style",`
				position: absolute;
				width: 100%;
				height: ${e.titleBarHeight}px;
				left: 0;
				top: 0;
				background-color: ${i.titleBarBackground};
				-webkit-app-region: drag;
			`),r.appendChild(f),i.titleBarBorder&&e.titleBarHeight>0){const s=document.createElement("div");s.setAttribute("style",`
					position: absolute;
					width: 100%;
					height: 1px;
					left: 0;
					bottom: 0;
					border-bottom: 1px solid ${i.titleBarBorder};
				`),f.appendChild(s)}const l=document.createElement("div");if(l.setAttribute("style",`
				position: absolute;
				width: ${e.activityBarWidth}px;
				height: calc(100% - ${e.titleBarHeight+e.statusBarHeight}px);
				top: ${e.titleBarHeight}px;
				${e.sideBarSide}: 0;
				background-color: ${i.activityBarBackground};
			`),r.appendChild(l),i.activityBarBorder&&e.activityBarWidth>0){const s=document.createElement("div");s.setAttribute("style",`
					position: absolute;
					width: 1px;
					height: 100%;
					top: 0;
					${e.sideBarSide==="left"?"right":"left"}: 0;
					${e.sideBarSide==="left"?"border-right":"border-left"}: 1px solid ${i.activityBarBorder};
				`),l.appendChild(s)}if(t.workspace){const s=document.createElement("div");if(s.setAttribute("style",`
					position: absolute;
					width: ${e.sideBarWidth}px;
					height: calc(100% - ${e.titleBarHeight+e.statusBarHeight}px);
					top: ${e.titleBarHeight}px;
					${e.sideBarSide}: ${e.activityBarWidth}px;
					background-color: ${i.sideBarBackground};
				`),r.appendChild(s),i.sideBarBorder&&e.sideBarWidth>0){const v=document.createElement("div");v.setAttribute("style",`
						position: absolute;
						width: 1px;
						height: 100%;
						top: 0;
						right: 0;
						${e.sideBarSide==="left"?"right":"left"}: 0;
						${e.sideBarSide==="left"?"border-right":"border-left"}: 1px solid ${i.sideBarBorder};
					`),s.appendChild(v)}}const d=document.createElement("div");if(d.setAttribute("style",`
				position: absolute;
				width: 100%;
				height: ${e.statusBarHeight}px;
				bottom: 0;
				left: 0;
				background-color: ${t.workspace?i.statusBarBackground:i.statusBarNoFolderBackground};
			`),r.appendChild(d),i.statusBarBorder&&e.statusBarHeight>0){const s=document.createElement("div");s.setAttribute("style",`
					position: absolute;
					width: 100%;
					height: 1px;
					top: 0;
					border-top: 1px solid ${i.statusBarBorder};
				`),d.appendChild(s)}document.body.appendChild(r)}performance.mark("code/didShowPartsSplash")}}();

//# sourceMappingURL=/core/vs\code\electron-sandbox\workbench\workbench.js.map
