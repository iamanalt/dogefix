import { listeners } from './socket';

listeners.send.push((_ws: WebSocket, item) => {
	try {
		if (typeof item !== 'string') return item;
		const obj = JSON.parse(item);
		if (obj.op === 'send_room_chat_msg') {
			for (const token of obj.d.tokens) {
				if (token.t === 'emote') {
					token.d = token.d.replace(/[^a-z0-9]+/gi, '');
				}
			}
		}
		return JSON.stringify(item);
	} catch (error) {
		return item;
	}
});

export default {}
