(function(u,b,f,c,e,m,o,v,R,i){"use strict";const h=f.findByStoreName("UserStore"),{FormInput:x,FormDivider:p,FormText:F,FormIcon:d,FormRow:E,FormSection:I,FormSwitchRow:B}=v.Forms,y=e.stylesheet.createThemedStyleSheet({avatar:{height:36,width:36,borderRadius:18},button:{marginRight:12}});function S(l){let{callback:n}=l;return e.React.createElement(i.TouchableOpacity,{onPress:n},e.React.createElement(F,{style:y.button},"ADD"))}function k(l){let{onFinish:n}=l;const[a,r]=R.useState(""),g=function(){!isNaN(parseInt(a))&&h.getUser(a)&&!t.exempted.includes(a)&&(t.exempted=[...t.exempted,a],r("")),n()};return e.React.createElement(E,{leading:e.React.createElement(d,{source:o.getAssetIDByName("ic_add_friend")}),label:e.React.createElement(x,{autoFocus:!0,title:"User ID",placeholder:"123456789012345678",value:a,keyboardType:"numeric",onChangeText:function(s){return r(s.replace(/[^0-9]/g,"").trim())},returnKeyType:"done"}),trailing:e.React.createElement(i.TouchableOpacity,{onPress:g},e.React.createElement(d,{source:o.getAssetIDByName("ic_add_24px")}))})}function w(){m.useProxy(t);const[l,n]=R.useState(!1),a=e.NavigationNative.useNavigation();return R.useEffect(function(){a.setOptions({headerRight:function(){return e.React.createElement(S,{callback:function(){return n(!0)}})}})},[]),e.React.createElement(i.ScrollView,null,e.React.createElement(B,{label:"Enable blacklist mode",subLabel:"If enabled, only users in the exempted list will be affected by the plugin.",leading:e.React.createElement(d,{source:o.getAssetIDByName("ic_block")}),value:t.isBlacklistMode,onValueChange:function(r){return t.isBlacklistMode=r}}),e.React.createElement(I,{title:"Exempted Users"},t.exempted?.length>0&&e.React.createElement(i.FlatList,{data:t.exempted,keyExtractor:function(r){return r},renderItem:function(r){let{item:g}=r;const s=h.getUser(g);if(!s)throw new Error("User not found/is not cached");return e.React.createElement(E,{label:s.username,leading:e.React.createElement(i.Image,{style:y.avatar,source:{uri:s.getAvatarURL()}}),trailing:e.React.createElement(i.TouchableOpacity,{onPress:function(){t.exempted=t.exempted.filter(function(D){return D!==g})}},e.React.createElement(d,{source:o.getAssetIDByName("Small"),disableColor:!0}))})},ItemSeparatorComponent:p}),l&&e.React.createElement(e.React.Fragment,null,e.React.createElement(p,null),e.React.createElement(k,{onFinish:function(){return n(!1)}}))))}c.storage.isBlacklistMode??=!1,c.storage.exempted??=[];const t=c.storage,T=f.findByProps("createPendingReply");var U={settings:w,onUnload:b.patcher.before("createPendingReply",T,function(l){let[n]=l;const a=c.storage.exempted.includes(n.message?.author?.id);n.shouldMention&&=c.storage.isBlacklistMode?!a:a})};return u.default=U,u.settings=t,Object.defineProperty(u,"__esModule",{value:!0}),u})({},vendetta,vendetta.metro,vendetta.plugin,vendetta.metro.common,vendetta.storage,vendetta.ui.assets,vendetta.ui.components,window.React,vendetta.metro.common.ReactNative);