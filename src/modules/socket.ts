export const listeners: {
	open: Array<(ws: WebSocket, e: Event) => Event>;
	error: Array<(ws: WebSocket, e: Event) => Event>;
	message: Array<(ws: WebSocket, e: MessageEvent<any>) => MessageEvent<any>>;
	close: Array<(ws: WebSocket, e: CloseEvent) => CloseEvent>;
	send: Array<(ws: WebSocket, data: string | ArrayBufferLike | Blob | ArrayBufferView) => typeof data>;
} = {
	open: [],
	error: [],
	message: [],
	close: [],
	send: [],
}

class OurWebSocket {
	private _websocket;
	constructor (address: string, options?: string | string[] | undefined) {
		this._websocket = new WebSocket(address, options);
		this._websocket.addEventListener
	}
	get binaryType () {
		return this._websocket.binaryType;
	}
	set binaryType (val: "arraybuffer" | "blob") {
		if ((val === "arraybuffer") || (val === "blob")) {
			this._websocket.binaryType = val;
		}
	}
	get bufferedAmount () {
		return this._websocket.bufferedAmount;
	}
	get extensions () {
		return this._websocket.extensions;
	}
	get onopen () {
		return this._websocket.onopen;
	}
	set onopen (cb: null | ((ev: Event) => any)) {
		if (!cb) return;
		this._websocket.onopen = function (ev: Event) {
			for (const handle of listeners.open) {
				ev = handle(this, ev);
			}
			cb.apply(this, [ ev ]);
		}
	}
	get onerror () {
		return this._websocket.onerror;
	}
	set onerror (cb: null | ((ev: Event) => any)) {
		if (!cb) return;
		this._websocket.onerror = function (ev: Event) {
			for (const handle of listeners.error) {
				ev = handle(this, ev);
			}
			cb.apply(this, [ ev ]);
		}
	}
	get onmessage () {
		return this._websocket.onmessage;
	}
	set onmessage (cb: null | ((ev: MessageEvent<any>) => any)) {
		if (!cb) return;
		this._websocket.onmessage = function (ev: MessageEvent<any>) {
			for (const handle of listeners.message) {
				ev = handle(this, ev);
			}
			cb.apply(this, [ ev ]);
		}
	}
	get onclose () {
		return this._websocket.onclose;
	}
	set onclose (cb: null | ((ev: CloseEvent) => any)) {
		if (!cb) return;
		this._websocket.onclose = function (ev: CloseEvent) {
			for (const handle of listeners.close) {
				ev = handle(this, ev);
			}
			cb.apply(this, [ ev ]);
		}
	}
	get protocol () {
		return this._websocket.protocol;
	}
	get readyState () {
		return this._websocket.readyState;
	}
	get url () {
		return this._websocket.url;
	}
	close (code?: number, reason?: string) {
		return this._websocket.close(code, reason);
	}
	send (data: string | ArrayBufferLike | Blob | ArrayBufferView) {
		for (const handle of listeners.send) {
			data = handle(this._websocket, data);
		}
		return this._websocket.send(data);
	}
	get CLOSED () {
		return this._websocket.CLOSED;
	}
	get CLOSING () {
		return this._websocket.CLOSING;
	}
	get CONNECTING () {
		return this._websocket.CONNECTING;
	}
	get OPEN () {
		return this._websocket.OPEN;
	}
	addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions) {
		return this._websocket.addEventListener(type, listener, options);
	}
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions) {
		return this._websocket.removeEventListener(type, listener, options);
	}
}

export default OurWebSocket;
module.exports = OurWebSocket;

Object.assign(OurWebSocket, {
	default: OurWebSocket,
	OurWebSocket,
	listeners,
});
