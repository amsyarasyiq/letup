(function(exports,_vendetta,metro){'use strict';function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}let origState;const ChatInput=metro.findByDisplayName("ChatInput");var index = new(function(){function HideGiftButton(){_classCallCheck(this,HideGiftButton);}var _proto=HideGiftButton.prototype;_proto.onLoad=function onLoad(){_vendetta.logger.log("Starting HideGiftButton...");origState=ChatInput.defaultProps.hideGiftButton;ChatInput.defaultProps.hideGiftButton=true;};_proto.onUnload=function onUnload(){_vendetta.logger.log("Unloading HideGiftButton..");ChatInput.defaultProps.hideGiftButton=origState;};return HideGiftButton}());exports.default=index;Object.defineProperty(exports,'__esModule',{value:true});return exports;})({},vendetta,vendetta.metro);