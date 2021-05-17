
;(function() {

	function inject() {
		const script = document.createElement('script')
		script.text = `!function e(t,s,r){function o(i,u){if(!s[i]){if(!t[i]){var c="function"==typeof require&&require;if(!u&&c)return c(i,!0);if(n)return n(i,!0);var f=new Error("Cannot find module '"+i+"'");throw f.code="MODULE_NOT_FOUND",f}var a=s[i]={exports:{}};t[i][0].call(a.exports,(function(e){return o(t[i][1][e]||e)}),a,a.exports,e,t,s,r)}return s[i].exports}for(var n="function"==typeof require&&require,i=0;i<r.length;i++)o(r[i]);return o}({1:[function(e,t,s){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(s,"__esModule",{value:!0});const o=r(e("./modules/fix_emotes")),n=r(e("./modules/socket")),i={fix_emotes:o.default,socket:n.default};Object.assign(window,{DogeFix:i})},{"./modules/fix_emotes":2,"./modules/socket":3}],2:[function(e,t,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0});e("./socket").listeners.send.push(((e,t)=>{try{if("string"!=typeof t)return t;const e=JSON.parse(t);if("send_room_chat_msg"===e.op)for(const t of e.d.tokens)"emote"===t.t&&(t.v=t.v.replace(/[^a-z0-9]+/gi,""));return JSON.stringify(e)}catch(e){return t}})),s.default={}},{"./socket":3}],3:[function(e,t,s){"use strict";Object.defineProperty(s,"__esModule",{value:!0}),s.listeners=void 0,s.listeners={message:[],send:[]};const r=WebSocket;class o extends r{constructor(e,t){super(e,t);const r=this;this._real={message:this.onmessage,send:this.send},Object.assign(this,{send(e){for(const t of s.listeners.send)e=t(r,e);r._real.send.apply(r,[e])}}),this.addEventListener("message",(e=>{for(const t of s.listeners.message)t(this,e)}))}get _websocket(){return this}}s.default=o,t.exports=o,Object.assign(o,{default:o,OurWebSocket:o,listeners:s.listeners}),Object.assign(window,{OurWebSocket:o,WebSocket:o,RealWebSocket:r})},{}]},{},[1]);
`
		document.documentElement.appendChild(script)
	}

	inject();
})()
	