(function(t,e,n){"use strict";const o=e.patcher.before("dispatch",n.FluxDispatcher,function(c){let[{type:r}]=c;if(r==="IDLE")return[{type:"IDLE",idle:!1}]});return t.onUnload=o,t})({},vendetta,vendetta.metro.common);
