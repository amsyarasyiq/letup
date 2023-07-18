(function(f,a,y,F,o,S,_,h,m,w,A){"use strict";const u={DEFAULT_APP_NAME:"Music",DEFAULT_TIME_INTERVAL:5,APPLICATION_ID:"1054951789318909972",LFM_API_KEY:"014ffe8a614370f000d85d95ec30e1be",LFM_DEFAULT_COVER_HASHES:["2a96cbd8b46e442fc41c2b86b821562f","c6f59c1e5e7240a4c0d427abd71f3dbb"]};A.findByProps("SET_ACTIVITY");const C=A.findByProps("getAssetIds"),k=A.findByStoreName("SelfPresenceStore"),U=A.findByStoreName("UserStore");function p(){return L(null)}function L(e){r.pluginStopped&&(g(!0),e=null),r.lastActivity=e,a.FluxDispatcher.dispatch({type:"LOCAL_ACTIVITY_UPDATE",activity:e,pid:2312,socketId:"Last.fm@Vendetta"})}async function M(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:u.APPLICATION_ID;return e?await C.fetchAssetIds(t,e):[]}let N;const R={};function c(e,t){R[e]=t,N?.()}function O(){return[,N]=h.useReducer(function(e){return~e},0),JSON.stringify(R,null,4)}async function V(){const e=new URLSearchParams({method:"user.getrecenttracks",user:s.username,api_key:u.LFM_API_KEY,format:"json",limit:"1",extended:"1"}).toString(),t=await fetch(`https://ws.audioscrobbler.com/2.0/?${e}`);if(!t.ok)throw new Error(`Failed to fetch the latest scrobble: ${t.statusText}`);const n=await t.json(),l=n?.recenttracks?.track?.[0];if(c("lastAPIResponse",l),!l)throw n;return{name:l.name,artist:l.artist.name,album:l.album["#text"],albumArt:await x(l.image?.find(function(K){return K.size==="large"})?.["#text"]),url:l.url,date:l.date?.["#text"]??"now",nowPlaying:!!l["@attr"]?.nowplaying,loved:l.loved==="1"}}async function x(e){return u.LFM_DEFAULT_COVER_HASHES.some(function(t){return e.includes(t)})?null:e}var E;(function(e){e[e.PLAYING=0]="PLAYING",e[e.STREAMING=1]="STREAMING",e[e.LISTENING=2]="LISTENING",e[e.COMPETING=5]="COMPETING"})(E||(E={}));const i=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return s.verboseLogging&&console.log(...t)};async function P(){if(r.pluginStopped){i("--> Plugin is unloaded, aborting update()..."),g();return}if(i("--> Fetching last track..."),!s.username)throw _.showToast("Last.fm username is not set!",o.getAssetIDByName("Small")),g(),new Error("Username is not set");if(s.ignoreSpotify)if(k.findActivity(function(n){return n.sync_id})){i("--> Spotify is currently playing, aborting..."),c("isSpotifyIgnored",!0),p();return}else c("isSpotifyIgnored",!1);else c("isSpotifyIgnored",void 0);const e=await V().catch(async function(n){throw i("--> An error occurred while fetching the last track, aborting..."),p(),n});if(c("lastTrack",e),!e.nowPlaying){i("--> Last track is not currently playing, aborting..."),p();return}if(i("--> Track fetched!"),r.lastTrackUrl===e.url){i("--> Last track is the same as the previous one, aborting...");return}const t={name:s.appName||u.DEFAULT_APP_NAME,flags:0,type:s.listeningTo?E.LISTENING:E.PLAYING,details:e.name,state:`by ${e.artist}`,application_id:u.APPLICATION_ID};if(r.lastTrackUrl=e.url,t.name.includes("{{"))for(const n in e)t.name=t.name.replace(`{{${n}}}`,e[n]);if(s.showTimestamp&&(t.timestamps={start:Date.now()/1e3|0}),e.album){const n=await M([e.albumArt]);t.assets={large_image:n[0],large_text:`on ${e.album}`}}i("--> Setting activity..."),c("lastActivity",t),i(t);try{L(t)}catch(n){throw i("--> An error occurred while setting the activity"),p(),n}i("--> Successfully set activity!")}function g(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:!1;r.lastActivity=null,r.lastTrackUrl=null,r.updateInterval&&clearInterval(r.updateInterval),!e&&p()}async function I(){if(r.pluginStopped)throw new Error("Plugin is already stopped!");g();let e=0;await P().catch(function(t){console.error(t),e++}),r.updateInterval=setInterval(function(){return P().then(function(){e=0}).catch(function(t){console.error(t),++e>3&&(console.error("Failed to fetch/set activity 3 times, aborting..."),g())})},(Number(s.timeInterval)||u.DEFAULT_TIME_INTERVAL)*1e3)}const r={};w.plugin.storage.ignoreSpotify??=!0;const s={...w.plugin.storage};var B={settings:h.lazy(function(){return Promise.resolve().then(function(){return z})}),onLoad(){if(r.pluginStopped=!1,U.getCurrentUser())I().catch(console.error);else{const e=function(){I().catch(console.error),a.FluxDispatcher.unsubscribe(e)};a.FluxDispatcher.subscribe("CONNECTION_OPEN",e)}},onUnload(){r.pluginStopped=!0,g()}};const{FormRow:D,FormInput:T,FormDivider:d,FormSwitchRow:v,FormText:G,FormIcon:b}=S.Forms;function $(){async function e(){for(const t in y.storage)y.storage[t]!=null&&(s[t]=y.storage[t]);await I(),_.showToast("Settings updated!",o.getAssetIDByName("Check"))}return a.React.createElement(m.TouchableOpacity,{onPress:e},a.React.createElement(G,{style:{marginRight:12}},"UPDATE"))}var Y=a.React.memo(function(){const e=F.useProxy(y.storage),t=a.NavigationNative.useNavigation();return h.useEffect(function(){t.setOptions({title:"Last.fm Configuration",headerRight:$})},[]),a.React.createElement(m.ScrollView,null,a.React.createElement(T,{value:e.appName||void 0,onChangeText:function(n){return e.appName=n.trim()},title:"Discord Application Name",placeholder:u.DEFAULT_APP_NAME,returnKeyType:"done"}),a.React.createElement(d,null),a.React.createElement(T,{required:!0,value:e.username||void 0,onChangeText:function(n){return e.username=n.trim()},title:"Last.fm username",helpText:!e.username&&a.React.createElement(m.Text,{style:{color:"#FF0000"}},"This field is required!"),placeholder:"wumpus123",returnKeyType:"done"}),a.React.createElement(d,null),a.React.createElement(T,{value:e.timeInterval,onChangeText:function(n){return e.timeInterval=n},title:"Update interval (in seconds)",placeholder:u.DEFAULT_TIME_INTERVAL.toString(),keyboardType:"numeric",returnKeyType:"done"}),a.React.createElement(d,null),a.React.createElement(v,{label:"Show time elapsed",subLabel:"Show the time elapsed since the song started playing",leading:a.React.createElement(b,{source:o.getAssetIDByName("clock")}),value:e.showTimestamp,onValueChange:function(n){return e.showTimestamp=n}}),a.React.createElement(d,null),a.React.createElement(v,{label:"Set status as listening",subLabel:'Set your status as "Listening to" instead of "Playing"',leading:a.React.createElement(b,{source:o.getAssetIDByName("ic_headset_neutral")}),value:e.listeningTo,onValueChange:function(n){return e.listeningTo=n}}),a.React.createElement(d,null),a.React.createElement(v,{label:"Hide when Spotify is running",subLabel:"Hide the status when a Spotify activity is detected",leading:a.React.createElement(b,{source:o.getAssetIDByName("img_account_sync_spotify_light_and_dark")}),value:e.ignoreSpotify,onValueChange:function(n){return e.ignoreSpotify=n}}),a.React.createElement(d,null),a.React.createElement(D,{label:"Debug",subLabel:"View debug information",leading:a.React.createElement(b,{source:o.getAssetIDByName("debug")}),trailing:D.Arrow,onPress:function(){t.push("VendettaCustomPage",{title:"Debug",render:h.lazy(function(){return Promise.resolve().then(function(){return j})})})}}))}),z=Object.freeze({__proto__:null,default:Y});function H(){const e=O();return React.createElement(m.ScrollView,null,React.createElement(S.Codeblock,{selectable:!0,style:{margin:12}},e))}var j=Object.freeze({__proto__:null,default:H});return f.currentSettings=s,f.default=B,f.pluginState=r,Object.defineProperty(f,"__esModule",{value:!0}),f})({},vendetta.metro.common,vendetta.plugin,vendetta.storage,vendetta.ui.assets,vendetta.ui.components,vendetta.ui.toasts,window.React,vendetta.metro.common.ReactNative,vendetta,vendetta.metro);
