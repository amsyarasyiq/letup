(function(t,n,a){"use strict";function u(o,r){if(!(o instanceof r))throw new TypeError("Cannot call a class as a function")}const f=a.findByProps("show","confirm","close"),d=a.findByProps("handleStartCall");var h=new(function(){function o(){u(this,o)}var r=o.prototype;return r.onLoad=function(){n.logger.log("MoreConfirm: patching calls..."),n.patcher.instead("handleStartCall",d,function(c,y){const[{rawRecipients:[{username:l,discriminator:i},s]},C]=c,e=C?"video call":"call";f.show({title:s?`MoreConfirm: Start a group ${e}?`:`MoreConfirm: Start a ${e} with ${l}#${i}?`,body:s?"Are you sure you want to start the group call?":`Are you sure you want to ${e} ${l}#${i}?`,confirmText:"Yes",cancelText:"Cancel",confirmColor:"brand",onConfirm:function(){try{y(...c)}catch(p){n.logger.error("Failed to start call",p)}}})})},o}());return t.default=h,Object.defineProperty(t,"__esModule",{value:!0}),t})({},vendetta,vendetta.metro);
