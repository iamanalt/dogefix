export const listeners: {
	message: Array<(ws: WebSocket, e: MessageEvent<any>) => MessageEvent<any>>;
	send: Array<(ws: WebSocket, data: string | ArrayBufferLike | Blob | ArrayBufferView) => typeof data>;
} = {
	message: [],
	send: [],
}

const RealWebSocket = WebSocket;

class OurWebSocket extends RealWebSocket {
	get _websocket () {
		return this;
	}
	private _real: {
		message: ((this: WebSocket, ev: MessageEvent<any>) => any) | null,
		send: (data: string | ArrayBufferLike | Blob | ArrayBufferView) => void,
	};
	constructor (address: string, options?: string | string[] | undefined) {
		super(address, options);
		const self = this;
		this._real = {
			message: this.onmessage,
			send: this.send,
		}
		Object.assign(this, {
			send (data: string | ArrayBufferLike | Blob | ArrayBufferView) {
				for (const handle of listeners.send) {
					data = handle(self, data);
				}
				self._real.send.apply(self, [ data ]);
			}
		});
		this.addEventListener('message', (ev: MessageEvent<any>) => {
			for (const handle of listeners.message) {
				handle(this, ev);
			}
		});
	}
}

export default OurWebSocket;
module.exports = OurWebSocket;

Object.assign(OurWebSocket, {
	default: OurWebSocket,
	OurWebSocket,
	listeners,
});

Object.assign(window, {
	OurWebSocket,
	WebSocket: OurWebSocket,
	RealWebSocket
});
