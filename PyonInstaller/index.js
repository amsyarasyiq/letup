(function(e,n,t,o){"use strict";var r={onLoad(){var a=this;n.plugins.removePlugin(n.plugin.id),setTimeout(function(){return o.showConfirmationAlert({title:"Install Pyoncord?",content:"Loader's settings will be overriden to load Pyoncord instead. You may not be able to revert to Vendetta whenever Pyoncord breaks!",confirmText:"Continue and Restart",cancelText:"Nevermind",onConfirm:a.install})},300)},async install(){t.config.customLoadUrl?(t.config.customLoadUrl.enabled=!0,t.config.customLoadUrl.url="https://raw.githubusercontent.com/pyoncord/pyoncord/builds/pyoncord.js",setTimeout(globalThis.nativeModuleProxy.BundleUpdaterManager.reload,100)):alert("not a proper vendetta loader!")}};return e.default=r,Object.defineProperty(e,"__esModule",{value:!0}),e})({},vendetta,vendetta.loader,vendetta.ui.alerts);