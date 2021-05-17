import { ClientRequestArgs } from 'http';

class OurWebSocket {
	private _websocket;
	constructor (address: string, options?: string | string[] | undefined) {
		this._websocket = new WebSocket(address, options);
	}
	get url () {
		return this._websocket.url;
	}
	get readystate () {
		return this._websocket.readyState;
	}
	get bufferedAmount () {
		return this._websocket.bufferedAmount;
	}
	set onopen (cb: (event: NodeWebSocket.OpenEvent) => void) {
		this._websocket.onopen = (event: NodeWebSocket.OpenEvent) => {
		}
	}
	fixOpen (event: NodeWebSocket.OpenEvent) {}
}

export default OurWebSocket;

/**
 * ["url", "readyState", "bufferedAmount", "onopen", "onerror", "onclose", "extensions", "protocol", "onmessage", "binaryType", "CONNECTING", "OPEN", "CLOSING", "CLOSED", "close", "send"]
 */